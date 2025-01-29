import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box, Typography, Card, CardContent, Select, MenuItem, Grid, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button
} from "@mui/material";
// import { blockUser } from '../../../api/services/UserService';
import { TUserProfileResponse } from '../../../constants/apiTypes';
import { useAuth } from '../../../contexts';
import { toast } from 'react-toastify';

interface UserManageMentProps {
  userDataList: TUserProfileResponse[] | null;
}

const UserManagement: React.FC<UserManageMentProps> = ({ userDataList }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const { token } = useAuth();
  const [users, setUsers] = useState<TUserProfileResponse[] | null>(userDataList);
  const [selectedUser, setSelectedUser] = useState<TUserProfileResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBlockUser = async (id: number) => {
    // const response = await blockUser(id);
    // if (response.isSuccess) {
    //   toast(t("success.user_management.block_user"));
    // } else {
    //   toast(t('error.user_management.block_failed'));
    // }
    // // setSelectedUser(users.find((user) => user.id === id) || null);
    // setIsDialogOpen(true);
  };

  const confirmStatusChange = () => {
    // if (selectedUser && newStatus) {
    //   setUsers((prevUsers) =>
    //     prevUsers.map((user) =>
    //       user.id === selectedUser.id ? { ...user, status: newStatus } : user
    //     )
    //   );
    // }
    setIsDialogOpen(false);
    setSelectedUser(null);
    // setNewStatus(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: '100vw',
        margin: '0 auto',
        padding: 20,
        direction: isRtl ? "rtl" : "ltr",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          {t("report.user_management.title")}
        </Typography>

        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} key={user.id}>
              <Card
                sx={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    position: "absolute",
                    top: 10,
                    fontWeight: "bold",
                  }}
                >
                  {t("report.user_management.user_info")}
                </Typography>
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                    }}
                  >
                    {t("report.user_management.email")}: {user.email}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    {t("report.user_management.status")}
                  </Typography>
                  <Select
                    value={user.blocked}
                    onChange={(event) =>
                      handleBlockUser(user.id)
                    }
                    sx={{
                      minWidth: 150,
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="Allowed">
                      {t("report.user_management.allowed")}
                    </MenuItem>
                    <MenuItem value="Blocked">
                      {t("report.user_management.blocked")}
                    </MenuItem>
                  </Select>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          {t("report.user_management.confirmation_title")}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {t("report.user_management.confirmation_message", {
              email: selectedUser?.email,
              status: t(
                `report.user_management.${newStatus?.toLowerCase()}`,
                newStatus
              ),
            })}
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            {t("report.user_management.cancel")}
          </Button>
          <Button onClick={confirmStatusChange} color="primary">
            {t("report.user_management.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
