import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import api from '../services/apiAuth'
import { FaArrowLeft, FaCheck, FaClock, FaTimes, FaTruck, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa'
import { getImageUrl } from '../services/apiUtils'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 90vh;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
  }
`

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'success':
        return `background: ${theme.colors.success}20; color: ${theme.colors.success};`
      case 'warning':
        return `background: ${theme.colors.warning}20; color: ${theme.colors.warning};`
      case 'error':
        return `background: ${theme.colors.error}20; color: ${theme.colors.error};`
      default:
        return `background: ${theme.colors.gray[200]}; color: ${theme.colors.gray[700]};`
    }
  }}
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gray[50]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 60px 1fr;
    align-items: flex-start;
    row-gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 56px 1fr;
  }
`

const ItemThumb = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background-image: url(${props => props.$src || 'none'});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 56px;
    height: 56px;
  }
`

const ItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const ItemName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const ItemMeta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const ItemPrice = styled.div`
  text-align: right;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  
  &:last-child { 
    border-bottom: none; 
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};

    &:last-child {
      font-size: ${({ theme }) => theme.typography.sizes.lg};
    }
  }
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`
const InlineIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  height: fit-content;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
  }
`

function formatCurrency(value) {
  const num = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(num)) return '$0.00'
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function formatDate(dateString) {
  if (!dateString) return '—'
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function resolveImageUrl(imageCover) {
  const url = getImageUrl(imageCover)
  return url || ''
}

const OrderDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [order, setOrder] = useState(location.state?.order || null)
  const [loading, setLoading] = useState(!location.state?.order)
  const [error, setError] = useState(null)

  useEffect(() => {
    const hasSufficientData = !!(order && Array.isArray(order.orderItems) && order.orderItems.length > 0 && order.shippingAddress && (order.totalPrice !== undefined && order.totalPrice !== null))
    if (hasSufficientData) {
      setLoading(false)
      return
    }
    let isActive = true
    async function fetchOrder() {
      setLoading(true)
      setError(null)
      try {
        // Try direct fetch by id
        let fetched = null
        try {
          const res = await api.get(`/orders/${id}`)
          fetched = res.data?.data?.order || res.data?.data || res.data?.order || res.data
        } catch (_) {
          // ignore and fallback
        }
        // Fallback: fetch my-orders and find by id
        if (!fetched) {
          const res2 = await api.get('/orders/my-orders')
          const user = res2.data?.data?.user || res2.data?.data || res2.data?.user || res2.data
          const found = (user?.orders || []).find(o => (o._id === id) || (o.id === id))
          fetched = found || null
        }
        if (!fetched) throw new Error('Order not found')
        if (isActive) setOrder(fetched)
      } catch (err) {
        if (isActive) setError(err.response?.data?.message || err.message || 'Failed to load order')
      } finally {
        if (isActive) setLoading(false)
      }
    }
    fetchOrder()
    return () => { isActive = false }
  }, [id, order])

  const ui = useMemo(() => {
    if (!order) return null
    const items = Array.isArray(order.orderItems) ? order.orderItems : (Array.isArray(order.items) ? order.items : [])
    return {
      id: order._id || order.id,
      createdAt: order.createdAt,
      isDelivered: !!order.isDelivered,
      paymentStatus: order.paymentStatus || 'unpaid',
      totalPrice: order.totalPrice,
      shippingAddress: order.shippingAddress || {},
      items: items.map(oi => ({
        id: oi._id || oi.id,
        name: oi.product?.name || oi.name || 'Product',
        image: resolveImageUrl(oi.product?.imageCover || oi.image),
        quantity: oi.quantity || 1,
        price: oi.price || oi.product?.price || 0,
        productId: oi.product?.id || oi.product?._id,
        categoryName: oi.product?.category?.name,
      }))
    }
  }, [order])

  const subtotal = useMemo(() => {
    if (!ui) return 0
    return ui.items.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity || 1)), 0)
  }, [ui])

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={() => navigate(-1)}><FaArrowLeft /> Back</BackButton>
          <Title>Loading order…</Title>
          <div />
        </Header>
        <Card><CardBody>Loading order details…</CardBody></Card>
      </PageContainer>
    )
  }

  if (error || !ui) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={() => navigate('/orders')}><FaArrowLeft /> Back to Orders</BackButton>
          <Title>Order Details</Title>
          <div />
        </Header>
        <Card>
          <CardBody>
            {error || 'Order not found.'}
          </CardBody>
        </Card>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate('/orders')}><FaArrowLeft /> Back to Orders</BackButton>
        <TitleGroup>
          <Title>Order {ui.id}</Title>
          <MetaRow>
            <span>Placed on {formatDate(ui.createdAt)}</span>
            <StatusBadge $variant={ui.isDelivered ? 'success' : 'warning'}>
              {ui.isDelivered ? <FaCheck /> : <FaClock />}
              {ui.isDelivered ? 'Delivered' : 'Processing'}
            </StatusBadge>
            <StatusBadge $variant={ui.paymentStatus === 'paid' ? 'success' : ui.paymentStatus === 'pending' ? 'warning' : 'error'}>
              <FaCreditCard /> {ui.paymentStatus}
            </StatusBadge>
          </MetaRow>
        </TitleGroup>
        <div />
      </Header>

      <ContentGrid>
        <Card>
          <CardHeader>Items</CardHeader>
          <CardBody>
            <ItemsList>
              {ui.items.map(item => (
                <ItemRow key={item.id}>
                  <ItemThumb $src={item.image} />
                  <ItemTitle>
                    <ItemName>{item.name}</ItemName>
                    <ItemMeta>
                      Qty: {item.quantity} · Unit: {formatCurrency(item.price)} · Total: {formatCurrency((item.price || 0) * (item.quantity || 1))}
                    </ItemMeta>
                  </ItemTitle>
                  <ItemPrice>{formatCurrency((item.price || 0) * (item.quantity || 1))}</ItemPrice>
                </ItemRow>
              ))}
              {ui.items.length === 0 && (
                <div>No items found for this order.</div>
              )}
            </ItemsList>
          </CardBody>
        </Card>

        <div>
          <SidebarContainer>
            <Card>
              <CardHeader>Order Summary</CardHeader>
              <CardBody>
                <Section>
                  <SummaryRow>
                    <span>Subtotal</span>
                    <strong>{formatCurrency(subtotal)}</strong>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Shipping</span>
                    <strong>{formatCurrency(0)}</strong>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Total</span>
                    <strong>{formatCurrency(ui.totalPrice)}</strong>
                  </SummaryRow>
                </Section>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>Shipping</CardHeader>
              <CardBody>
                <Section>
                  <InlineIcon><FaMapMarkerAlt /> <strong>Address</strong></InlineIcon>
                  <div>{ui.shippingAddress?.address || '—'}</div>
                  <div>
                    {ui.shippingAddress?.city || '—'}, {ui.shippingAddress?.postalCode || '—'}
                  </div>
                  <div>{ui.shippingAddress?.country || '—'}</div>
                </Section>
              </CardBody>
            </Card>
          </SidebarContainer>
        </div>
      </ContentGrid>
    </PageContainer>
  )
}

export default OrderDetailsPage
