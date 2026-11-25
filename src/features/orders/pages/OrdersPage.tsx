import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const OrdersPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <Card className="shadow-none dark:ring-0">
        <CardHeader>
          <CardTitle className="text-xl">طلبات التوصيل</CardTitle>
          <CardDescription>
            متابعة طلبات زبائن شركة «وصّل»، والبحث باسم الزبون، والترتيب حسب
            التاريخ أو المبلغ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            سيتم ربط البيانات وخيارات البحث والترتيب في المرحلة الرابعة.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

export default OrdersPage
