'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Category } from '@/Types/category.type'
import Link from 'next/link'

interface Props {
  categories: Category[]
}

export default function CategoriesDropdownClient({ categories }: Props) {

  const staticCategories = [
  { title: "Electronics", key: "Electronics" },
  { title: "Women's Fashion", key: "Women's Fashion" },
  { title: "Men's Fashion", key: "Men's Fashion" },
  { title: "Beauty & Health", key: "Beauty & Health" },
]
  return (
    <NavigationMenu>
      <NavigationMenuItem className="list-none">
        <NavigationMenuTrigger className="text-[#364153] font-medium text-base focus:bg-transparent hover:bg-transparent hover:text-global flex">
          Categories
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-50">
            {/* All Categories */}
            <li>
              <NavigationMenuLink asChild>
                <Link href="/categories">
                  <div className="flex flex-col gap-1 text-base">
                    <div className="block px-4 transition-colors">All Categories</div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>

            {/* Dynamic Categories */}
            {staticCategories.map((item) => {
  const cat = categories.find(c => c.name === item.key)

  return (
    <ListItem
      key={item.key}
      href={`/SubCategory/${cat?._id}`}
      title={item.title}
    />
  )
})}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-base">
            <div className="block px-4 transition-colors">{title}</div>
            <div className="line-clamp-2  text-gray-400 ">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

