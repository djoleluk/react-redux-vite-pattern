import { useEffect } from 'react'
import { Card } from '../../components/Card'
import { Table } from '../../components/table/Table'
import { TableHeader } from '../../components/table/TableHeader'
import { TableBody } from '../../components/table/TableBody'
import { TableRow } from '../../components/table/TableRow'
import { TableCell } from '../../components/table/TableCell'
import { Button } from '../../components/Button'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPendingUsers, selectPendingUsers, selectPendingUsersStatus, selectPendingUsersError } from '../../features/pendingUsers/pendingUsersSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectPendingUsers)
  const status = useAppSelector(selectPendingUsersStatus)
  const error = useAppSelector(selectPendingUsersError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPendingUsers())
    }
  }, [status, dispatch])

  const handleRemove = (index: number) => {
    console.log(`Removing user at index ${index}`)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Card variant="elevated" padding="none">
          <Table>
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
              {users.map((user, index) => (
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
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
} 