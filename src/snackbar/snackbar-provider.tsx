"use client";

import { useRef } from "react";
import {
  SnackbarProvider as NotistackProvider,
  SnackbarProviderProps,
  closeSnackbar,
} from "notistack";
// @mui
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  options?: SnackbarProviderProps;
};

export default function SnackbarProvider({ children, options }: Props) {
  const notistackRef = useRef<NotistackProvider>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      variant="success" // Set default variant
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      // with close as default
      action={(snackbarId) => (
        <IconButton
          size="small"
          onClick={() => closeSnackbar(snackbarId)}
          sx={{ p: 0.5 }}
        >
          <CloseIcon width={16} />
        </IconButton>
      )}
      {...options}
    >
      {children}
    </NotistackProvider>
  );
}
