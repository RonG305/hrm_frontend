import { Card } from '../ui/card'
import TaksList from '../Tasks/TaksList'
import { Task } from '../Tasks/types'

const ProfileContent = ({data}: {data: Task[]}) => {
  return (
    <Card className='p-4 mt-4'>
        <TaksList initialData={data} />
    </Card>
  )
}

export default ProfileContent
