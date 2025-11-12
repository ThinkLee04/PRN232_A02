import { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDescription: '',
    parentCategoryId: '',
    isActive: true,
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories(false); // activeOnly=false: lấy tất cả
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    if (!searchTerm) {
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    setFormData({
      categoryName: '',
      categoryDescription: '',
      parentCategoryId: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription || '',
      parentCategoryId: category.parentCategoryId || '',
      isActive: category.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const submitData = {
        ...formData,
        parentCategoryId: formData.parentCategoryId ? parseInt(formData.parentCategoryId) : null,
      };

      if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory.categoryId, submitData);
        toast.success('Category updated successfully');
      } else {
        await categoryService.createCategory(submitData);
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await categoryService.deleteCategory(selectedCategory.categoryId);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaPlus />
          Create Category
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={category.categoryId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{category.categoryName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-500">{category.categoryDescription || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500">{category.parentCategoryName || 'None'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      category.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(category)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCategory ? 'Edit Category' : 'Create Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.categoryDescription}
              onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category
            </label>
            <select
              value={formData.parentCategoryId}
              onChange={(e) => setFormData({ ...formData, parentCategoryId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">None</option>
              {categories
                .filter((cat) => cat.categoryId !== selectedCategory?.categoryId && cat.isActive)
                .map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div>

          {!selectedCategory && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Active</label>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              disabled={formLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {formLoading ? <LoadingSpinner size="small" /> : selectedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.categoryName}"? This action cannot be undone if the category has no news articles.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default CategoryManagement;
