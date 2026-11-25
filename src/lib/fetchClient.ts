import mockData from "@/constants/mockData.json"

const API_DELAY_MS = 1200
const DEMO_MUTATION_MESSAGE =
  "هذه البيانات تجريبية للعرض فقط وليست مرتبطة بـ API حقيقي"

let simulateNextError = false

export const triggerSimulatedApiError = () => {
  simulateNextError = true
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  await delay(API_DELAY_MS)

  if (simulateNextError) {
    simulateNextError = false
    throw new Error("تعذّر الاتصال بالخادم حالياً، يرجى إعادة المحاولة.")
  }

  const method = (options.method ?? "GET").toUpperCase()

  if (method !== "GET") {
    return {
      data: null,
      message: DEMO_MUTATION_MESSAGE,
    } as T
  }

  if (endpoint === "/statistics") {
    return {
      data: mockData.dashboard,
      message: "تم جلب الإحصائيات بنجاح",
    } as T
  }

  if (endpoint.startsWith("/orders")) {
    return {
      data: mockData.orders,
      message: "تم جلب الطلبات بنجاح",
    } as T
  }

  throw new Error("المسار المطلوب غير متاح")
}
