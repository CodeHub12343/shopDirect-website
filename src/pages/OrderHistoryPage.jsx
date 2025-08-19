import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../services/apiAuth' // <-- ADD THIS LINE
import { getImageUrl } from '../services/apiUtils'
import { createReview } from '../services/apiReviews'
import {
  FaSearch, FaFilter, FaDownload, FaEye, FaTruck, FaCheck,
  FaTimes, FaClock, FaBox, FaMapMarkerAlt, FaCreditCard,
  FaStar, FaUndo, FaRedo, FaCalendarAlt, FaShoppingCart
} from 'react-icons/fa'

// REMOVE MOCK DATA
// const ORDERS_DATA = [...]

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const HeaderSubtitle = styled.p`
  opacity: 0.9;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`

const FiltersSection = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`

const FiltersRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 300px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 3rem;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FilterButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ active, theme }) => active ? theme.colors.primary.main : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[50]};
  }
`

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const OrderCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const OrderId = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const OrderDate = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const OrderTotal = styled.div`
  text-align: right;
`

const TotalAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  ${({ status, theme }) => {
    switch (status) {
      case 'delivered': return `background: ${theme.colors.success}20; color: ${theme.colors.success};`;
      case 'in-transit': return `background: ${theme.colors.warning}20; color: ${theme.colors.warning};`;
      case 'processing': return `background: ${theme.colors.info}20; color: ${theme.colors.info};`;
      case 'cancelled': return `background: ${theme.colors.error}20; color: ${theme.colors.error};`;
      default: return `background: ${theme.colors.gray[200]}; color: ${theme.colors.gray[700]};`;
    }
  }}
`

const OrderContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const ProductThumbnails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`

const ProductThumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: url(${props => props.image}) center/cover;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  position: relative;
  
  &:after {
    content: ${props => props.count > 1 ? `"+${props.count - 1}"` : '""'};
    position: absolute;
    top: -5px;
    right: -5px;
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`

const OrderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`

const TrackingSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`

const TrackingTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TrackingTimeline = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 150px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: auto;
  }
`

const TimelineIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ completed, theme }) => completed ? theme.colors.success : theme.colors.gray[300]};
  color: ${({ completed, theme }) => completed ? 'white' : theme.colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  flex-shrink: 0;
`

const TimelineContent = styled.div`
  flex: 1;
`

const TimelineStage = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ completed, theme }) => completed ? theme.colors.text.primary : theme.colors.text.secondary};
`

const TimelineDate = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.gray[300]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviewingOrder, setReviewingOrder] = useState(null)
  const [reviewPayload, setReviewPayload] = useState({ rating: 0, review: '', productId: null })
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewError, setReviewError] = useState(null)

  // Fetch orders from API
  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/orders/my-orders')
      .then(res => {
        // Get user object (from getCurrentUser logic)
        const user = res.data.data?.user || res.data.data || res.data.user || res.data;
        // Map backend orders to UI format
        const ordersRaw = user.orders || [];
        const orders = ordersRaw.map(order => ({
          id: order._id,
          date: order.createdAt,
          total: order.totalPrice,
          status: order.isDelivered ? 'delivered' : 'processing',
          paymentStatus: order.paymentStatus,
          shippingAddress: order.shippingAddress,
          orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
          items: Array.isArray(order.orderItems)
            ? order.orderItems.map(oi => {
                const img = oi.product?.imageCover || (oi.product?.images && oi.product.images[0]) || null
                return {
                  id: oi._id || oi.id,
                  name: oi.product?.name,
                  image: getImageUrl(img),
                }
              })
            : [],
        }));
        setOrders(orders)
        setFilteredOrders(orders)
        setLoading(false)
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message || 'Failed to fetch orders')
        setLoading(false)
      })
  }, [])

  // Filter orders based on status and search query
  useEffect(() => {
    let filtered = orders
    if (activeFilter !== 'all') {
      filtered = filtered.filter(order => order.status === activeFilter)
    }
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.items && order.items.some(item =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      )
    }
    setFilteredOrders(filtered)
  }, [orders, activeFilter, searchQuery])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheck />
      case 'in-transit': return <FaTruck />
      case 'processing': return <FaClock />
      case 'cancelled': return <FaTimes />
      default: return <FaBox />
    }
  }

  const getTimelineIcon = (stage) => {
    switch (stage) {
      case 'Order Placed': return <FaCheck />
      case 'Processing': return <FaClock />
      case 'Shipped': return <FaTruck />
      case 'In Transit': return <FaBox />
      case 'Out for Delivery': return <FaTruck />
      case 'Delivered': return <FaCheck />
      default: return <FaBox />
    }
  }

  const handleViewDetails = (order) => {
    navigate(`/orders/${order.id}`, { state: { order } })
  }

  const handleReorder = (order) => {
    alert(`Adding ${order.items.length} items to cart from order ${order.id}`)
  }

  const handleTrackShipment = (order) => {
    if (order.tracking?.number) {
      window.open(`https://www.fedex.com/fedextrack/?trknbr=${order.tracking.number}`, '_blank')
    }
  }

  const handleDownloadInvoice = (order) => {
    alert(`Downloading invoice for order ${order.id}`)
  }

  const handleLeaveReview = (order) => {
    if (order.status !== 'delivered') return
    const firstItem = Array.isArray(order.orderItems) && order.orderItems[0]
    const productId = firstItem?.product?.id || firstItem?.product?._id || order.items?.[0]?.id
    setReviewingOrder(order)
    setReviewPayload({ rating: 0, review: '', productId })
  }

  const handleSubmitReview = async () => {
    try {
      setReviewError(null)
      if (!reviewingOrder || !reviewPayload.productId) {
        setReviewError('No product selected for review')
        return
      }
      if (!reviewPayload.rating || reviewPayload.rating < 1) {
        setReviewError('Please select a rating')
        return
      }
      setSubmittingReview(true)
      await createReview(reviewPayload.productId, {
        rating: reviewPayload.rating,
        review: reviewPayload.review,
      })
      setSubmittingReview(false)
      setReviewingOrder(null)
      setReviewPayload({ rating: 0, review: '', productId: null })
      alert('Review submitted successfully')
    } catch (err) {
      setSubmittingReview(false)
      setReviewError(err?.response?.data?.message || err.message || 'Failed to submit review')
    }
  }

  const handleRequestReturn = (order) => {
    alert(`Opening return form for order ${order.id}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>Your Orders</HeaderTitle>
        <HeaderSubtitle>View, track, and manage your past purchases</HeaderSubtitle>
      </Header>
      <FiltersSection>
        <FiltersRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search by order ID or product name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchContainer>
          <FilterButtons>
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => handleFilterChange('all')}
            >
              All Orders
            </FilterButton>
            <FilterButton
              active={activeFilter === 'processing'}
              onClick={() => handleFilterChange('processing')}
            >
              Processing
            </FilterButton>
            <FilterButton
              active={activeFilter === 'in-transit'}
              onClick={() => handleFilterChange('in-transit')}
            >
              In Transit
            </FilterButton>
            <FilterButton
              active={activeFilter === 'delivered'}
              onClick={() => handleFilterChange('delivered')}
            >
              Delivered
            </FilterButton>
          </FilterButtons>
        </FiltersRow>
      </FiltersSection>
      {/* Loading and error states */}
      {loading ? (
        <EmptyState>
          <EmptyIcon><FaBox /></EmptyIcon>
          <EmptyTitle>Loading orders...</EmptyTitle>
        </EmptyState>
      ) : error ? (
        <EmptyState>
          <EmptyIcon><FaBox /></EmptyIcon>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyMessage>{error}</EmptyMessage>
        </EmptyState>
      ) : filteredOrders.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <FaBox />
          </EmptyIcon>
          <EmptyTitle>No orders found</EmptyTitle>
          <EmptyMessage>
            {searchQuery || activeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : "You haven't placed any orders yet"
            }
          </EmptyMessage>
          {!searchQuery && activeFilter === 'all' && (
            <ActionButton
              className="primary"
              onClick={() => navigate('/')}
            >
              <FaShoppingCart />
              Start Shopping
            </ActionButton>
          )}
        </EmptyState>
      ) : (
        <OrdersList>
          {filteredOrders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  <OrderId>{order.id}</OrderId>
                  <OrderDate>
                    <FaCalendarAlt />
                    Placed on {formatDate(order.date)}
                  </OrderDate>
                </OrderInfo>
                
                <OrderTotal>
                  <TotalAmount>
                    {typeof order.total === 'number' && !isNaN(order.total)
                      ? `$${order.total.toFixed(2)}`
                      : '$0.00'}
                  </TotalAmount>
                  <StatusBadge status={order.status}>
                    {getStatusIcon(order.status)}
                    {order.status?.replace('-', ' ')}
                  </StatusBadge>
                </OrderTotal>
              </OrderHeader>

              <OrderContent>
                <ProductThumbnails>
                  {(Array.isArray(order.items) ? order.items.slice(0, 3) : []).map((item, index) => (
                    <ProductThumbnail
                      key={item.id}
                      image={item.image}
                      count={index === 2 && order.items && order.items.length > 3 ? order.items.length - 2 : 0}
                    />
                  ))}
                </ProductThumbnails>
                
                <OrderActions>
                  <ActionButton onClick={() => handleViewDetails(order)}>
                    <FaEye />
                    View Details
                  </ActionButton>
                  
                  {order.status === 'delivered' && (
                    <>
                      <ActionButton onClick={() => handleLeaveReview(order)}>
                        <FaStar />
                        Leave Review
                      </ActionButton>
                      <ActionButton onClick={() => handleReorder(order)}>
                        <FaRedo />
                        Reorder
                      </ActionButton>
                      <ActionButton onClick={() => handleRequestReturn(order)}>
                        <FaUndo />
                        Return
                      </ActionButton>
                    </>
                  )}
                  
                  {order.status === 'in-transit' && order.tracking?.number && (
                    <ActionButton onClick={() => handleTrackShipment(order)}>
                      <FaTruck />
                      Track Shipment
                    </ActionButton>
                  )}
                  
                  <ActionButton onClick={() => handleDownloadInvoice(order)}>
                    <FaDownload />
                    Invoice
                  </ActionButton>
                </OrderActions>
              </OrderContent>

              {(order.status === 'in-transit' || order.status === 'processing') && order.tracking && (
                <TrackingSection>
                  <TrackingTitle>
                    <FaTruck />
                    Tracking Information
                  </TrackingTitle>
                  <TrackingTimeline>
                    {order.tracking.timeline.map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelineIcon completed={item.completed}>
                          {getTimelineIcon(item.stage)}
                        </TimelineIcon>
                        <TimelineContent>
                          <TimelineStage completed={item.completed}>
                            {item.stage}
                          </TimelineStage>
                          {item.date && (
                            <TimelineDate>
                              {formatDateTime(item.date)}
                            </TimelineDate>
                          )}
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </TrackingTimeline>
                </TrackingSection>
              )}
            </OrderCard>
          ))}
        </OrdersList>
      )}
      {reviewingOrder && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '520px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Leave a Review</h3>
            <p style={{ marginTop: 0, color: '#6b7280' }}>Order {reviewingOrder.id}</p>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600 }}>Rating:</span>
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => setReviewPayload(p => ({ ...p, rating: star }))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: star <= reviewPayload.rating ? '#f59e0b' : '#d1d5db' }}>★</button>
              ))}
            </div>

            <div style={{ marginBottom: '12px' }}>
              <textarea
                rows={4}
                placeholder="Share your experience..."
                value={reviewPayload.review}
                onChange={(e) => setReviewPayload(p => ({ ...p, review: e.target.value }))}
                style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #e5e7eb' }}
              />
            </div>

            {reviewError && <div style={{ color: '#dc2626', marginBottom: 12 }}>{reviewError}</div>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => { setReviewingOrder(null); setReviewPayload({ rating: 0, review: '', productId: null }) }} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>Cancel</button>
              <button onClick={handleSubmitReview} disabled={submittingReview} className="primary" style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff' }}>
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}

export default OrderHistoryPage 