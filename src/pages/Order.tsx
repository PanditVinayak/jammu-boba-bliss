
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';

// Define the drinks data
const drinks = [
  { id: 1, name: 'Classic Milk Tea', price: 120 },
  { id: 2, name: 'Taro Milk Tea', price: 135 },
  { id: 3, name: 'Thai Milk Tea', price: 130 },
  { id: 4, name: 'Matcha Milk Tea', price: 150 },
  { id: 5, name: 'Mango Tango', price: 150 },
  { id: 6, name: 'Passion Fruit Green Tea', price: 145 },
  { id: 7, name: 'Strawberry Lychee', price: 160 },
  { id: 8, name: 'Peach Oolong', price: 140 },
  { id: 9, name: 'Brown Sugar Boba Milk', price: 170 },
  { id: 10, name: 'Rose Milk Tea', price: 160 },
  { id: 11, name: 'Oreo Cream Cheese', price: 175 },
  { id: 12, name: 'Tiramisu Milk Tea', price: 180 },
];

// Define toppings data
const toppings = [
  { id: 1, name: 'Tapioca Pearls', price: 20 },
  { id: 2, name: 'Grass Jelly', price: 25 },
  { id: 3, name: 'Aloe Vera', price: 30 },
  { id: 4, name: 'Crystal Boba', price: 25 },
  { id: 5, name: 'Pudding', price: 30 },
  { id: 6, name: 'Fruit Jellies', price: 25 },
];

// Create order schema for form validation
const orderSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
  pickupTime: z.string().min(1, { message: 'Pickup time is required' }),
  drinkId: z.string().min(1, { message: 'Please select a drink' }),
  toppingIds: z.array(z.string()).optional(),
  sweetness: z.string().min(1, { message: 'Sweetness level is required' }),
  ice: z.string().min(1, { message: 'Ice level is required' }),
  quantity: z.string().min(1, { message: 'Quantity is required' }),
  notes: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const Order = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Get the form initialization data
  const urlDrinkId = searchParams.get('item');

  // Set up the form with validation
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      phone: '',
      pickupTime: '',
      drinkId: urlDrinkId || '',
      toppingIds: [],
      sweetness: '100',
      ice: 'regular',
      quantity: '1',
      notes: '',
    },
  });

  const watchDrinkId = form.watch('drinkId');
  const watchToppingIds = form.watch('toppingIds');
  const watchQuantity = form.watch('quantity');

  // Calculate total price when selections change
  useEffect(() => {
    let price = 0;
    
    // Add drink price
    const selectedDrink = drinks.find(drink => drink.id.toString() === watchDrinkId);
    if (selectedDrink) {
      price += selectedDrink.price;
    }
    
    // Add toppings
    if (watchToppingIds && watchToppingIds.length > 0) {
      watchToppingIds.forEach(toppingId => {
        const topping = toppings.find(tp => tp.id.toString() === toppingId);
        if (topping) {
          price += topping.price;
        }
      });
    }
    
    // Multiply by quantity
    price *= parseInt(watchQuantity || '1');
    
    setTotalPrice(price);
  }, [watchDrinkId, watchToppingIds, watchQuantity]);

  const onSubmit = (data: OrderFormValues) => {
    // Here you would typically send this data to your server
    console.log('Order submitted:', data);
    
    // Show a success message
    toast({
      title: 'Order Submitted!',
      description: `Thank you, ${data.name}! Your order will be ready for pickup at ${data.pickupTime}.`,
    });
    
    // Reset the form
    form.reset();
  };

  // Generate pickup time options (current time + 15min increments for the next 2 hours)
  const getPickupTimeOptions = () => {
    const times = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Round up to next 15 min
    let startMinute = Math.ceil(currentMinute / 15) * 15;
    let startHour = currentHour;
    
    if (startMinute === 60) {
      startMinute = 0;
      startHour += 1;
    }
    
    // Create time options for the next 2 hours in 15-minute increments
    for (let h = 0; h < 2; h++) {
      for (let m = 0; m < 4; m++) {
        const hour = (startHour + h) % 24;
        const minute = (startMinute + m * 15) % 60;
        
        if (h === 0 && m === 0 && startMinute > 0) continue;
        
        const formattedHour = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        const formattedMinute = minute.toString().padStart(2, '0');
        
        times.push(`${formattedHour}:${formattedMinute} ${period}`);
      }
    }
    
    return times;
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Place Your Order</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Fill out the form below to place your order for pickup. We'll have your drink freshly made and waiting for you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Customer Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Customer Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pickupTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Time</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select pickup time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {getPickupTimeOptions().map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Drink Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Drink Selection</h3>
                        
                        <FormField
                          control={form.control}
                          name="drinkId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Drink</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a drink" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {drinks.map((drink) => (
                                    <SelectItem key={drink.id} value={drink.id.toString()}>
                                      {drink.name} (₹{drink.price})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sweetness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sweetness Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select sweetness level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="0">0% (No sugar)</SelectItem>
                                  <SelectItem value="25">25% (Slightly sweet)</SelectItem>
                                  <SelectItem value="50">50% (Half sweet)</SelectItem>
                                  <SelectItem value="75">75% (Less sweet)</SelectItem>
                                  <SelectItem value="100">100% (Full sweetness)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="ice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ice Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ice level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="no_ice">No Ice</SelectItem>
                                  <SelectItem value="light">Light Ice</SelectItem>
                                  <SelectItem value="regular">Regular Ice</SelectItem>
                                  <SelectItem value="extra">Extra Ice</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select quantity" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Toppings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Toppings (Optional)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {toppings.map((topping) => (
                          <div key={topping.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`topping-${topping.id}`}
                              value={topping.id.toString()}
                              className="rounded border-gray-300 text-boba-primary focus:ring-boba-primary"
                              onChange={(e) => {
                                const value = e.target.value;
                                const currentValues = form.getValues('toppingIds') || [];
                                
                                if (e.target.checked) {
                                  form.setValue('toppingIds', [...currentValues, value]);
                                } else {
                                  form.setValue(
                                    'toppingIds',
                                    currentValues.filter((id) => id !== value)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={`topping-${topping.id}`}>
                              {topping.name} (+₹{topping.price})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Special Instructions */}
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special requests or allergies?" 
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-boba-primary hover:bg-boba-dark">
                      Place Order
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected Drink:</span>
                    <span>
                      {watchDrinkId ? 
                        drinks.find(d => d.id.toString() === watchDrinkId)?.name : 
                        'None selected'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toppings:</span>
                    <span>
                      {watchToppingIds?.length ? 
                        watchToppingIds.length + ' selected' : 
                        'None selected'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span>{watchQuantity || 1}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-boba-primary">₹{totalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Payment will be collected upon pickup.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Need Help?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact us directly if you have any questions about your order.
                    </p>
                    <a
                      href="https://wa.me/910000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-5 h-5 mr-2"
                      >
                        <path d="M12 1C5.9 1 1 5.9 1 12c0 2.1.6 4 1.5 5.7L1 22l4.3-1.5c1.7.9 3.6 1.5 5.7 1.5 6.1 0 11-4.9 11-11S18.1 1 12 1zm0 20c-2 0-3.8-.6-5.3-1.6l-.4-.2-3 1.1 1.1-3-.2-.4C3.2 15.7 2.5 13.8 2.5 12 2.5 6.8 6.8 2.5 12 2.5S21.5 6.8 21.5 12 17.2 21.5 12 21.5z"/>
                        <path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-4-3.5-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5-.1-.1-.7-1.6-1-2.2-.2-.6-.5-.5-.7-.5-.2 0-.3 0-.5 0-.1 0-.4.1-.7.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.1 2 3.5 4.9 4.9.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.2-.1-.5-.3z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
