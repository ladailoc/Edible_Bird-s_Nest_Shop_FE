import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Box, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";


import { userApi } from "~/services/axios.user";
import User from "~/types/user";
import { useNavigate } from "react-router-dom";
import DeleteUser from "../DeleteUser/DeleteUser";

function ListUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  //dialog delete user
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      console.log("Response data:", response);
      setUsers(response); 
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

    useEffect(() => {
    
      
      fetchUsers();
    }, []);

  const formatRole = (role: string) => {
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel>Họ Tên</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Số Điện Thoại
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Vai Trò
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Trạng Thái Hoạt Động
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Hành Động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">{user.phoneNumber}</TableCell>
                <TableCell align="center">{formatRole(user.role)}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={user.isActive ? "Hoạt Động" : "Không Hoạt Động"}
                    color={user.isActive ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      "& .MuiIconButton-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <Tooltip title="Xem chi tiết">
                      <IconButton  onClick={() => { navigate(`detail/${user.id}`); }}>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => { navigate(`edit/${user.id}`); }}>
                        <CreateOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" 
                        onClick={() => {
                          setUserToDelete({
                            id: user.id,
                            name: user.name
                          });
                          setDeleteDialogOpen(true);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {userToDelete && (
        <DeleteUser
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          userId={userToDelete.id}
          userName={userToDelete.name}
          onDeleteSuccess={() => {
            fetchUsers(); 
          }}
        />
      )}
    </>
  );
}

export default ListUsers;