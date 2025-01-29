import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { ConfirmationDialog } from '../../../components/molecules';
import { changeUserToAdmin } from '../../../api/services/AuthService';
import { TUserProfileResponse } from '../../../constants/apiTypes';
import { toast } from 'react-toastify';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CustomButton } from "../../atoms";

interface UserManageMentProps {
  userDataList: TUserProfileResponse[] | null;
}

const UserManagement: React.FC<UserManageMentProps> = ({ userDataList }) => {
  const { t, i18n } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleBecomeAdmin = async (id: number) => {
    setIsDialogOpen(false);
    const response = await changeUserToAdmin(id);
    if (response.isSuccess) {
      toast(t("success.user_management.admin_user"));
    } else {
      toast(t('error.user_management.become_admin_failed'));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: '100vw',
        margin: '0 auto',
        padding: 20,
        direction: i18n.language === "fa" ? "rtl" : "ltr",
        overflow: "auto",
      }}
    >
      {(!userDataList || userDataList.length == 0) && (
        <Box sx={{ textAlign: 'center' }}>
          <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {t("error.user_management.retrieve_failed")}
          </Typography>
        </Box>
      )}

      {userDataList && (
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
          <Grid container spacing={3}>
            {
              userDataList.map((user) => (
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
                      {t("dashboard.admin.user_management.user_info")}
                    </Typography>
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: 2,
                        }}
                      >
                        {t("dashboard.admin.user_management.email")}: {user.username}
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        {t("dashboard.admin.user_management.status")}:
                        {user.blocked ? t("dashboard.admin.user_management.blocked") : t("dashboard.admin.user_management.allowed")}
                      </Typography>

                      <CustomButton
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setIsDialogOpen(true);
                        }}
                        text={t("dashboard.admin.user_management.become_admin")}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      )}
      <ConfirmationDialog
        isDialogOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCheck={() => selectedUserId && handleBecomeAdmin(selectedUserId)}
        message={t("dashboard.admin.user_management.confirmation_message")}
      />
    </Box>
  );
};

export default UserManagement;
