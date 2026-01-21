import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/format"

export default function AdminDashboardPage() {
  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stockQuantity, 0)
  const featuredProducts = products.filter((p) => p.featured).length

  const stats = [
    {
      title: "Total Productos",
      value: totalProducts.toString(),
      description: `${inStockProducts} disponibles`,
      icon: Package,
    },
    {
      title: "Valor de Inventario",
      value: formatPrice(totalValue),
      description: "Stock actual",
      icon: DollarSign,
    },
    {
      title: "Productos Destacados",
      value: featuredProducts.toString(),
      description: "En homepage",
      icon: TrendingUp,
    },
    {
      title: "Agotados",
      value: (totalProducts - inStockProducts).toString(),
      description: "Requieren restock",
      icon: ShoppingCart,
    },
  ]

  const recentProducts = products.slice(0, 5)

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 font-[family-name:var(--font-montserrat)]">
          Bienvenido al panel de administración de Esmeralda Luxe
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground font-[family-name:var(--font-montserrat)]">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">{stat.value}</div>
              <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    {product.sku} · {product.collection}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium font-[family-name:var(--font-montserrat)]">{formatPrice(product.price)}</p>
                  <p
                    className={`text-sm font-[family-name:var(--font-montserrat)] ${product.inStock ? "text-green-600" : "text-red-500"}`}
                  >
                    {product.inStock ? `${product.stockQuantity} en stock` : "Agotado"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
