import { getAllProjects } from '@/components/Projects/actions'
import ProjectsList from '@/components/Projects/ProjectsList';
import React from 'react'

const page = async() => {
    const projects =  await getAllProjects();
  return <ProjectsList initialData={projects?.results} />
}

export default page
