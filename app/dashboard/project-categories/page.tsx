import { getAllProjectCategories } from '@/components/ProjectCategories/actions';
import ProjectCategoriesList from '@/components/ProjectCategories/ProjectCategoriesList';
import React from 'react'

const page = async () => {
    const categories = await getAllProjectCategories();
    if(categories?.error) {
      return <div className='text-center text-red-500'>Error loading categories: {categories.error}</div>
    }
  return <ProjectCategoriesList initialData={categories?.results} />
}

export default page
