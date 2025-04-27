
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DrinkCategory {
  id: string;
  name: string;
  drinks: Drink[];
}

interface Drink {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  tags?: string[];
}

const Menu = () => {
  const categories: DrinkCategory[] = [
    {
      id: 'milk-tea',
      name: 'Milk Tea',
      drinks: [
        {
          id: 1,
          name: 'Classic Milk Tea',
          description: 'Our signature milk tea with brown sugar boba pearls',
          image: 'https://images.unsplash.com/photo-1558857563-c0c6dd611b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹120',
          popular: true,
          tags: ['classic', 'signature']
        },
        {
          id: 2,
          name: 'Taro Milk Tea',
          description: 'Creamy taro root blended with milk tea and chewy boba',
          image: 'https://images.unsplash.com/photo-1541696490-8744a5dc0228?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹135',
          tags: ['creamy']
        },
        {
          id: 3,
          name: 'Thai Milk Tea',
          description: 'Strong black tea blended with condensed milk and spices',
          image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹130',
          tags: ['spicy']
        },
        {
          id: 4,
          name: 'Matcha Milk Tea',
          description: 'Premium Japanese matcha with milk and honey boba',
          image: 'https://images.unsplash.com/photo-1591849018711-a9a4068d66dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹150',
          popular: true,
          tags: ['japanese']
        },
      ],
    },
    {
      id: 'fruit-tea',
      name: 'Fruit Tea',
      drinks: [
        {
          id: 5,
          name: 'Mango Tango',
          description: 'Fresh mango puree with coconut jelly and tapioca pearls',
          image: 'https://images.unsplash.com/photo-1560023907-5f339537639a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹150',
          popular: true,
          tags: ['fruity', 'refreshing']
        },
        {
          id: 6,
          name: 'Passion Fruit Green Tea',
          description: 'Tangy passion fruit with jasmine green tea and aloe vera cubes',
          image: 'https://images.unsplash.com/photo-1546039907-4d2e1c1c3a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹145',
          tags: ['tangy']
        },
        {
          id: 7,
          name: 'Strawberry Lychee',
          description: 'Sweet strawberry and lychee with fruit bits and pink boba',
          image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹160',
          tags: ['sweet']
        },
        {
          id: 8,
          name: 'Peach Oolong',
          description: 'Premium oolong tea with fresh peach puree and white pearls',
          image: 'https://images.unsplash.com/photo-1542444256-164bd34dbe23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹140',
          tags: ['refreshing']
        },
      ],
    },
    {
      id: 'specialty',
      name: 'Specialty',
      drinks: [
        {
          id: 9,
          name: 'Brown Sugar Boba Milk',
          description: 'Fresh milk with homemade brown sugar syrup and warm boba',
          image: 'https://images.unsplash.com/photo-1627783288350-8c8f6e2db708?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹170',
          popular: true,
          tags: ['signature', 'specialty']
        },
        {
          id: 10,
          name: 'Rose Milk Tea',
          description: 'Fragrant rose-infused milk tea with crystal boba',
          image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹160',
          tags: ['floral']
        },
        {
          id: 11,
          name: 'Oreo Cream Cheese',
          description: 'Blended Oreo cookies with sweet cream cheese foam',
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹175',
          tags: ['creamy', 'sweet']
        },
        {
          id: 12,
          name: 'Tiramisu Milk Tea',
          description: 'Coffee-infused milk tea with mascarpone cream and cocoa',
          image: 'https://images.unsplash.com/photo-1592285896110-2d64dcd0ccfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          price: '₹180',
          tags: ['coffee', 'dessert']
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState('all');

  const allDrinks = categories.flatMap((category) => category.drinks);
  const popularDrinks = allDrinks.filter((drink) => drink.popular);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our handcrafted selection of premium bubble teas, made with only the finest ingredients 
            and brewed to perfection. Customize with your choice of toppings and sweetness level.
          </p>
        </div>

        {/* Menu Tabs */}
        <Tabs defaultValue="all" className="mb-10" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-boba-primary data-[state=active]:text-white">
                All Drinks
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-boba-primary data-[state=active]:text-white">
                Popular
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-boba-primary data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* All Drinks Tab Content */}
          <TabsContent value="all" className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allDrinks.map((drink) => (
                <MenuCard key={drink.id} drink={drink} />
              ))}
            </div>
          </TabsContent>

          {/* Popular Tab Content */}
          <TabsContent value="popular" className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDrinks.map((drink) => (
                <MenuCard key={drink.id} drink={drink} />
              ))}
            </div>
          </TabsContent>

          {/* Category Tab Contents */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.drinks.map((drink) => (
                  <MenuCard key={drink.id} drink={drink} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Action Button */}
        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-boba-primary hover:bg-boba-dark">
            <Link to="/order">Order Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MenuCardProps {
  drink: Drink;
}

const MenuCard = ({ drink }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden hover-scale">
      <div className="relative h-48">
        <img 
          src={drink.image} 
          alt={drink.name} 
          className="h-full w-full object-cover"
        />
        {drink.popular && (
          <div className="absolute top-2 right-2 bg-boba-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{drink.name}</h3>
          <span className="text-boba-primary font-bold">{drink.price}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{drink.description}</p>
        {drink.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {drink.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-boba-light text-boba-primary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Button asChild variant="outline" className="w-full mt-4 border-boba-primary text-boba-primary hover:bg-boba-primary/10">
          <Link to={`/order?item=${drink.id}`}>Order Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Menu;
