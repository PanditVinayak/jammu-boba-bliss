
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Home = () => {
  const featuredDrinks = [
    {
      id: 1,
      name: 'Classic Milk Tea',
      description: 'Our signature milk tea with brown sugar boba pearls',
      image: 'https://images.unsplash.com/photo-1558857563-c0c6dd611b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      price: '₹120',
    },
    {
      id: 2,
      name: 'Mango Tango',
      description: 'Fresh mango puree with coconut jelly and tapioca pearls',
      image: 'https://images.unsplash.com/photo-1560023907-5f339537639a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      price: '₹150',
    },
    {
      id: 3,
      name: 'Taro Milk Tea',
      description: 'Creamy taro root blended with milk tea and chewy boba',
      image: 'https://images.unsplash.com/photo-1541696490-8744a5dc0228?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      price: '₹135',
    },
  ];

  const todaySpecial = {
    name: 'Rose Milk Tea with Brown Sugar Boba',
    description: 'Fragrant rose-infused milk tea with warm brown sugar boba pearls',
    image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    price: '₹160',
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-boba-primary/10 to-boba-light py-20 lg:py-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-boba-primary/20 bubble-animation"></div>
          <div className="absolute top-40 right-40 w-12 h-12 rounded-full bg-boba-secondary/20 bubble-animation" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-boba-accent/20 bubble-animation" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-heading mb-6 font-pacifico">
                Taste the Bliss of Boba in Jammu
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Handcrafted bubble teas with premium ingredients. Experience the perfect blend of flavors in every sip.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-boba-primary hover:bg-boba-dark">
                  <Link to="/menu">Explore Our Menu</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-boba-primary text-boba-primary hover:bg-boba-primary/10">
                  <Link to="/order">Order Now</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1559035636-a99258c3d0c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Colorful boba tea drinks" 
                className="rounded-lg shadow-xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Today's Special Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">Limited Time Offer</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Today's Special</h2>
          </div>

          <div className="bg-gradient-to-r from-boba-light to-purple-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src={todaySpecial.image}
                  alt={todaySpecial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900">{todaySpecial.name}</h3>
                <p className="mt-4 text-gray-600">{todaySpecial.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-3xl font-bold text-boba-secondary">{todaySpecial.price}</span>
                  <span className="ml-2 text-sm text-gray-500">Limited time only</span>
                </div>
                <Button asChild className="mt-8 bg-boba-primary hover:bg-boba-dark w-full md:w-auto">
                  <Link to="/order">Order This Special</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drinks Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">Handcrafted With Love</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Featured Drinks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDrinks.map((drink) => (
              <Card key={drink.id} className="overflow-hidden hover-scale">
                <img 
                  src={drink.image} 
                  alt={drink.name} 
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{drink.name}</h3>
                    <span className="text-boba-primary font-bold">{drink.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{drink.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-boba-primary text-boba-primary hover:bg-boba-primary/10">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1612632882762-5a1780f8862d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                alt="Boba tea preparation" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">Our Story</span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">Bringing Authentic Boba to Jammu</h2>
              <Separator className="my-6" />
              <p className="text-gray-600 mb-6">
                Founded with a passion for authentic flavors and quality ingredients, Jammu Boba Bliss 
                brings the global sensation of bubble tea to the heart of Jammu. Our journey began with 
                a simple idea: to create delightful, handcrafted drinks that bring joy with every sip.
              </p>
              <Button asChild variant="outline" className="border-boba-primary text-boba-primary hover:bg-boba-primary/10">
                <Link to="/about">Read Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-boba-primary to-boba-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Bliss?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Place your order now for pickup at our Jammu location and treat yourself to the best bubble tea in town.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-boba-primary hover:bg-gray-100">
            <Link to="/order">Order Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
