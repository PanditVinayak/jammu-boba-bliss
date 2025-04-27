
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From a small bubble tea cart to Jammu's most beloved boba destination.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">Our Journey</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">From Dream to Reality</h2>
            <Separator className="my-6" />
            <p className="text-gray-600 mb-6">
              Jammu Boba Bliss started as a dream between two friends, Rahul and Priya, who were passionate 
              about bringing the global bubble tea trend to their hometown in Jammu. Having tasted amazing 
              bubble tea during their travels, they were inspired to create their own unique recipes that 
              would blend international flavors with local Indian tastes.
            </p>
            <p className="text-gray-600 mb-6">
              In 2022, they started with a small mobile cart in Gandhi Nagar, serving just four signature 
              drinks. Word quickly spread about their uniquely crafted bubble teas, and soon lines began 
              forming at their humble cart.
            </p>
            <p className="text-gray-600">
              Today, Jammu Boba Bliss has grown into a beloved local brand, still maintaining the quality 
              and passion that started it all. Our commitment to using premium ingredients, handmade boba, 
              and creative recipes continues to be the heart of our business.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
              alt="Founders of Jammu Boba Bliss" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">What We Stand For</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-boba-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-boba-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Ingredients</h3>
                <p className="text-gray-600">
                  We source only premium tea leaves, fresh fruits, and authentic ingredients to create our signature drinks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-boba-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-boba-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We constantly experiment with new flavors and combinations to bring exciting drinks to our menu.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-boba-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-boba-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600">
                  We believe in building relationships with our customers and supporting local initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">Meet Our Team</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">The Faces Behind the Boba</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                  alt="Rahul Sharma" 
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Rahul Sharma</h3>
              <p className="text-boba-primary">Co-Founder</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                  alt="Priya Khanna" 
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Priya Khanna</h3>
              <p className="text-boba-primary">Co-Founder</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                  alt="Aditya Verma" 
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Aditya Verma</h3>
              <p className="text-boba-primary">Tea Master</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                  alt="Meera Patel" 
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Meera Patel</h3>
              <p className="text-boba-primary">Customer Relations</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-12">
            <span className="text-sm text-boba-secondary font-medium uppercase tracking-wider">Got Questions?</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is bubble tea?</h3>
                <p className="text-gray-600">
                  Bubble tea (also known as boba tea) is a tea-based drink that originated in Taiwan in the early 1980s. It typically contains tea, milk, sugar, and chewy tapioca balls (boba pearls).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Are your ingredients locally sourced?</h3>
                <p className="text-gray-600">
                  We source our fruits and milk locally whenever possible. Our specialty tea leaves and tapioca pearls are imported from premium suppliers to ensure authentic taste and quality.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer dairy alternatives?</h3>
                <p className="text-gray-600">
                  Yes! We offer soy milk, almond milk, and oat milk alternatives for all of our milk tea options at a small additional charge.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How are the boba pearls made?</h3>
                <p className="text-gray-600">
                  Our boba pearls are made fresh daily from tapioca starch. We cook them to perfection to achieve that signature chewy texture that boba lovers crave.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I customize my drink?</h3>
                <p className="text-gray-600">
                  Absolutely! You can customize the sweetness level, ice level, and choose from various toppings to create your perfect drink.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you cater for events?</h3>
                <p className="text-gray-600">
                  Yes, we offer catering services for events. Please contact us at least one week in advance to discuss your requirements and get a custom quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
