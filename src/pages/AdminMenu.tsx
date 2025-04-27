
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  popular: boolean;
}

const AdminMenu = () => {
  const { toast } = useToast();
  
  // Sample menu items data
  const initialMenuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Classic Milk Tea',
      description: 'Our signature milk tea with brown sugar boba pearls',
      price: '120',
      image: 'https://images.unsplash.com/photo-1558857563-c0c6dd611b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'milk-tea',
      popular: true,
    },
    {
      id: 2,
      name: 'Taro Milk Tea',
      description: 'Creamy taro root blended with milk tea and chewy boba',
      price: '135',
      image: 'https://images.unsplash.com/photo-1541696490-8744a5dc0228?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'milk-tea',
      popular: false,
    },
    {
      id: 3,
      name: 'Thai Milk Tea',
      description: 'Strong black tea blended with condensed milk and spices',
      price: '130',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'milk-tea',
      popular: false,
    },
    {
      id: 4,
      name: 'Matcha Milk Tea',
      description: 'Premium Japanese matcha with milk and honey boba',
      price: '150',
      image: 'https://images.unsplash.com/photo-1591849018711-a9a4068d66dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'milk-tea',
      popular: true,
    },
    {
      id: 5,
      name: 'Mango Tango',
      description: 'Fresh mango puree with coconut jelly and tapioca pearls',
      price: '150',
      image: 'https://images.unsplash.com/photo-1560023907-5f339537639a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'fruit-tea',
      popular: true,
    },
    {
      id: 6,
      name: 'Brown Sugar Boba Milk',
      description: 'Fresh milk with homemade brown sugar syrup and warm boba',
      price: '170',
      image: 'https://images.unsplash.com/photo-1627783288350-8c8f6e2db708?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'specialty',
      popular: true,
    },
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categories = [
    { id: 'milk-tea', name: 'Milk Tea' },
    { id: 'fruit-tea', name: 'Fruit Tea' },
    { id: 'specialty', name: 'Specialty' },
  ];

  // Create a new empty item template
  const newItemTemplate: MenuItem = {
    id: Math.max(...menuItems.map(item => item.id), 0) + 1,
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'milk-tea',
    popular: false,
  };

  const handleAddNew = () => {
    setSelectedItem(newItemTemplate);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleDelete = (item: MenuItem) => {
    setItemToDelete(item);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedItems = menuItems.filter(item => item.id !== itemToDelete.id);
      setMenuItems(updatedItems);
      
      toast({
        title: 'Item Deleted',
        description: `${itemToDelete.name} has been removed from the menu.`,
      });
      
      setIsDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveItem = () => {
    if (selectedItem) {
      if (!selectedItem.name || !selectedItem.price || !selectedItem.category) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }
      
      // Check if it's a new item or an edit
      const isNewItem = !menuItems.some(item => item.id === selectedItem.id);
      
      if (isNewItem) {
        setMenuItems([...menuItems, selectedItem]);
        toast({
          title: 'Item Added',
          description: `${selectedItem.name} has been added to the menu.`,
        });
      } else {
        const updatedItems = menuItems.map(item => 
          item.id === selectedItem.id ? selectedItem : item
        );
        setMenuItems(updatedItems);
        toast({
          title: 'Item Updated',
          description: `${selectedItem.name} has been updated.`,
        });
      }
      
      setIsDialogOpen(false);
      setSelectedItem(null);
    }
  };

  // Filter menu items based on category and search query
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <Button 
            onClick={handleAddNew}
            className="bg-boba-primary hover:bg-boba-dark"
          >
            Add New Item
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search" className="mb-2 block">Search</Label>
            <Input
              id="search"
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Label htmlFor="category-filter" className="mb-2 block">Filter by Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover-scale">
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                  />
                  {item.popular && (
                    <div className="absolute top-2 right-2 bg-boba-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-boba-primary font-bold">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    Category: {categories.find(cat => cat.id === item.category)?.name || item.category}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-boba-primary text-boba-primary hover:bg-boba-primary/10"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No menu items found matching your criteria.
            </div>
          )}
        </div>
        
        {/* Edit/Add Dialog */}
        {selectedItem && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{selectedItem.id === newItemTemplate.id ? 'Add New Item' : 'Edit Item'}</DialogTitle>
                <DialogDescription>
                  {selectedItem.id === newItemTemplate.id 
                    ? 'Add a new item to your menu.' 
                    : 'Make changes to the selected menu item.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name*
                  </Label>
                  <Input
                    id="name"
                    value={selectedItem.name}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category*
                  </Label>
                  <Select 
                    value={selectedItem.category}
                    onValueChange={(value) => setSelectedItem({ ...selectedItem, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (₹)*
                  </Label>
                  <Input
                    id="price"
                    value={selectedItem.price}
                    onChange={(e) => {
                      // Allow only numbers
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setSelectedItem({ ...selectedItem, price: value });
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={selectedItem.description}
                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    value={selectedItem.image}
                    onChange={(e) => setSelectedItem({ ...selectedItem, image: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">Popular</div>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox 
                      id="popular"
                      checked={selectedItem.popular}
                      onCheckedChange={(checked) => 
                        setSelectedItem({ ...selectedItem, popular: checked as boolean })
                      }
                    />
                    <Label htmlFor="popular">Mark as popular item</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveItem}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Delete Confirmation Dialog */}
        {itemToDelete && (
          <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{itemToDelete.name}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
