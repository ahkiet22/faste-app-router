"use client";

// ** React
import * as React from "react";
import { useTranslation } from "react-i18next";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// ** Icon
import Icon from "src/components/Icon";

// ** Config
import { LANGUAGE_OPTIONS } from "src/configs/i18n";
import { i18nConfig } from "src/app/i18n-config";
import { usePathname, useRouter } from "next/navigation";

type TProps = {};

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // ** Hook
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentLang = i18n.language;
  const currentPathname = usePathname();

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnchangeLang = React.useCallback(
    (lang: string) => {
      if (currentLang === i18nConfig.defaultLocale) {
        router.push("/" + lang + currentPathname);
      } else {
        router.push(currentPathname.replace(`/${currentLang}`, `/${lang}`));
      }

      // router.refresh();

      // i18n.changeLanguage(lang);
    },
    [router, currentLang, currentPathname],
  );

  return (
    <>
      <IconButton color="inherit" id="language-dropdow" onClick={handleOpen}>
        <Icon icon="material-symbols-light:translate-rounded" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {LANGUAGE_OPTIONS.map((lang) => (
          <MenuItem
            selected={lang.value === i18n.language}
            key={lang.value}
            onClick={() => handleOnchangeLang(lang.value)}
          >
            {/* <Typography>{lang.lang}</Typography> */}
            {lang.lang}
            {lang.value === i18n.language && (
              <Icon icon="mdi:tick-circle-outline" />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageDropdown;
