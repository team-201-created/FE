import { http, HttpResponse } from 'msw'
import {
  mockAdminBlendMaps,
  mockAdminProductPools,
  mockAdminProductMaps,
} from '@/mocks/data/adminRecommend'

export const adminBlendMapsHandlers = [
  http.get('*/api/v1/admin/matches/blend-maps', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const q = url.searchParams.get('q')?.toLowerCase()
    const publishStatus = url.searchParams.get('publish_status')
    const inputType = url.searchParams.get('input_type')

    let filtered = [...mockAdminBlendMaps]
    if (q) {
      filtered = filtered.filter(
        (item) =>
          item.id.toString().includes(q) ||
          item.input_type.toLowerCase().includes(q)
      )
    }
    if (publishStatus) {
      filtered = filtered.filter(
        (item) => item.publish_status === publishStatus
      )
    }
    if (inputType) {
      filtered = filtered.filter((item) => item.input_type === inputType)
    }

    const total_elements = filtered.length
    const total_pages = Math.ceil(total_elements / size) || 1
    const start = (page - 1) * size
    const content = filtered.slice(start, start + size)

    return HttpResponse.json({
      success: true,
      data: {
        content: content.map((item) => ({ ...item })),
        page,
        size,
        total_elements,
        total_pages,
      },
    })
  }),
  // http.patch('*/api/v1/admin/matches/blend-maps/:id', async ({ params, request }) => {
  //   const { id } = params
  //   const body = (await request.json()) as { status: string }
  //   const index = mockAdminBlendMaps.findIndex((item) => item.id === Number(id))
  //   if (index !== -1) {
  //     mockAdminBlendMaps[index].publish_status = body.status as any
  //     mockAdminBlendMaps[index].updated_at = new Date().toISOString()
  //     return HttpResponse.json({ success: true, data: mockAdminBlendMaps[index] })
  //   }
  //   return HttpResponse.json({ success: false }, { status: 404 })
  // }),
]

export const adminProductPoolsHandlers = [
  http.get('*/api/v1/admin/matches/product-pools', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const q = url.searchParams.get('q')?.toLowerCase()
    const adoptionStatus = url.searchParams.get('adoption_status')

    let filtered = [...mockAdminProductPools]
    if (q) {
      filtered = filtered.filter(
        (item) =>
          item.id.toString().includes(q) ||
          item.product_type.toLowerCase().includes(q)
      )
    }
    if (adoptionStatus) {
      filtered = filtered.filter(
        (item) => item.adoption_status === adoptionStatus
      )
    }

    const total_elements = filtered.length
    const total_pages = Math.ceil(total_elements / size) || 1
    const start = (page - 1) * size
    const content = filtered.slice(start, start + size)

    return HttpResponse.json({
      success: true,
      data: {
        content: content.map((item) => ({ ...item })),
        page,
        size,
        total_elements,
        total_pages,
      },
    })
  }),
  // http.patch('*/api/v1/admin/matches/product-pools/:id', async ({ params, request }) => {
  //   const { id } = params
  //   const body = (await request.json()) as { status: string }
  //   const index = mockAdminProductPools.findIndex((item) => item.id === Number(id))
  //   if (index !== -1) {
  //     mockAdminProductPools[index].adoption_status = body.status as any
  //     mockAdminProductPools[index].updated_at = new Date().toISOString()
  //     return HttpResponse.json({ success: true, data: mockAdminProductPools[index] })
  //   }
  //   return HttpResponse.json({ success: false }, { status: 404 })
  // }),
]

export const adminProductMapsHandlers = [
  http.get('*/api/v1/admin/matches/product-maps', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const q = url.searchParams.get('q')?.toLowerCase()
    const publishStatus = url.searchParams.get('publish_status')

    let filtered = [...mockAdminProductMaps]
    if (q) {
      filtered = filtered.filter(
        (item) =>
          item.id.toString().includes(q) ||
          item.product_pool_id.toString().includes(q)
      )
    }
    if (publishStatus) {
      filtered = filtered.filter(
        (item) => item.publish_status === publishStatus
      )
    }

    const total_elements = filtered.length
    const total_pages = Math.ceil(total_elements / size) || 1
    const start = (page - 1) * size
    const content = filtered.slice(start, start + size)

    return HttpResponse.json({
      success: true,
      data: {
        content: content.map((item) => ({ ...item })),
        page,
        size,
        total_elements,
        total_pages,
      },
    })
  }),
  // http.patch('*/api/v1/admin/matches/product-maps/:id', async ({ params, request }) => {
  //   const { id } = params
  //   const body = (await request.json()) as { status: string }
  //   const index = mockAdminProductMaps.findIndex((item) => item.id === Number(id))
  //   if (index !== -1) {
  //     mockAdminProductMaps[index].publish_status = body.status as any
  //     mockAdminProductMaps[index].updated_at = new Date().toISOString()
  //     return HttpResponse.json({ success: true, data: mockAdminProductMaps[index] })
  //   }
  //   return HttpResponse.json({ success: false }, { status: 404 })
  // }),
]
