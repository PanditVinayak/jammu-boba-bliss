
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: number;
  customer: string;
  phone: string;
  items: string;
  total: string;
  status: string;
  time: string;
  pickupTime: string;
}

const AdminOrders = () => {
  const { toast } = useToast();
  
  // Sample orders data
  const initialOrders: Order[] = [
    { id: 1, customer: 'Rahul Sharma', phone: '9876543210', items: 'Classic Milk Tea, Tapioca Pearls', total: '₹140', status: 'Pending', time: '20 minutes ago', pickupTime: '2:30 PM' },
    { id: 2, customer: 'Neha Gupta', phone: '9876543211', items: 'Taro Milk Tea, Crystal Boba', total: '₹160', status: 'Completed', time: '35 minutes ago', pickupTime: '2:15 PM' },
    { id: 3, customer: 'Aditya Verma', phone: '9876543212', items: 'Brown Sugar Boba Milk x2', total: '₹340', status: 'Completed', time: '1 hour ago', pickupTime: '1:45 PM' },
    { id: 4, customer: 'Meera Patel', phone: '9876543213', items: 'Mango Tango, Fruit Jellies', total: '₹175', status: 'Pending', time: '1.5 hours ago', pickupTime: '3:00 PM' },
    { id: 5, customer: 'Vikram Singh', phone: '9876543214', items: 'Rose Milk Tea', total: '₹160', status: 'Completed', time: '2 hours ago', pickupTime: '1:30 PM' },
    { id: 6, customer: 'Priya Khanna', phone: '9876543215', items: 'Passion Fruit Green Tea, Aloe Vera', total: '₹175', status: 'Ready', time: '25 minutes ago', pickupTime: '2:45 PM' },
    { id: 7, customer: 'Sameer Joshi', phone: '9876543216', items: 'Thai Milk Tea x3', total: '₹390', status: 'Pending', time: '10 minutes ago', pickupTime: '3:15 PM' },
    { id: 8, customer: 'Ananya Singh', phone: '9876543217', items: 'Matcha Milk Tea, Pudding', total: '₹180', status: 'Ready', time: '40 minutes ago', pickupTime: '2:30 PM' },
  ];

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    toast({
      title: 'Status Updated',
      description: `Order #${orderId} status changed to ${newStatus}.`,
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.phone.includes(searchQuery) ||
                         order.items.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search" className="mb-2 block">Search</Label>
            <Input
              id="search"
              placeholder="Search by name, phone, or items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Label htmlFor="status-filter" className="mb-2 block">Filter by Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Table */}
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {order.items}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Ready'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.pickupTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button 
                          variant="ghost" 
                          className="text-boba-primary hover:text-boba-dark hover:bg-boba-light"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Order Detail Panel */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Details #{selectedOrder.id}
                  </h2>
                  <Button 
                    variant="ghost" 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseDetails}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.customer}</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Information</h3>
                    <p className="mt-1 text-sm text-gray-900">Pickup Time: {selectedOrder.pickupTime}</p>
                    <p className="mt-1 text-sm text-gray-900">Total: {selectedOrder.total}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Items Ordered</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-900">{selectedOrder.items}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Update Status</h3>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={selectedOrder.status === 'Pending' ? 'default' : 'outline'}
                      className={selectedOrder.status === 'Pending' 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'border-orange-500 text-orange-500 hover:bg-orange-50'
                      }
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'Pending')}
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={selectedOrder.status === 'Ready' ? 'default' : 'outline'}
                      className={selectedOrder.status === 'Ready' 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                      }
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'Ready')}
                    >
                      Ready
                    </Button>
                    <Button 
                      variant={selectedOrder.status === 'Completed' ? 'default' : 'outline'}
                      className={selectedOrder.status === 'Completed' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'border-green-500 text-green-500 hover:bg-green-50'
                      }
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'Completed')}
                    >
                      Completed
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleCloseDetails}>Close</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
