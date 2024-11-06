import { useEffect } from 'react'
import { Card } from '../../components/Card'
import { Table } from '../../components/table/Table'
import { TableHeader } from '../../components/table/TableHeader'
import { TableBody } from '../../components/table/TableBody'
import { TableRow } from '../../components/table/TableRow'
import { TableCell } from '../../components/table/TableCell'
import { Button } from '../../components/Button'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getUsers, removeUser, selectUsers } from '../../features/users/usersSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleRemove = async (userId: number) => {
    try {
      await dispatch(removeUser(userId)).unwrap()
    } catch (err) {
      console.error('Failed to remove user:', err)
    }
  }

  const handleRefresh = () => {
    dispatch(getUsers())
  }

  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-[90%] max-w-6xl space-y-4">
        <Card variant="elevated" padding="none">
          <Table layout="fixed">
            <TableHeader variant="glow" sticky>
              <TableRow variant="header">
                <TableCell isHeader variant="glow">First Name</TableCell>
                <TableCell isHeader variant="glow">Last Name</TableCell>
                <TableCell isHeader variant="glow" align="center">Birth Date</TableCell>
                <TableCell isHeader variant="glow" align="center">Gender</TableCell>
                <TableCell isHeader variant="glow" align="right">Weight (kg)</TableCell>
                <TableCell isHeader variant="glow" align="right">Height (cm)</TableCell>
                <TableCell isHeader variant="glow" align="center">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody variant="default" dividers="thin">
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell align="center">{user.birth_date}</TableCell>
                  <TableCell align="center">{user.gender}</TableCell>
                  <TableCell align="right">{user.weight}</TableCell>
                  <TableCell align="right">{user.height}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="danger"
                      size="tiny"
                      onClick={() => handleRemove(user.user_id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="medium"
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
} 