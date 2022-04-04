import React from 'react'
import Button from "components/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface NextButtonProps {
  disabled?: boolean;
  linkTo?: string;
  text?: string;
  Icon?: any;
  onClick?: Function;
}

export const NextButton = ({ disabled, linkTo, text = "Next", Icon = () => <ArrowForwardIosIcon />, ...props }: NextButtonProps) => (
  <Button linkTo={linkTo} disabled={disabled} {...props}>
    {text}{Icon()}
  </Button>
)

export const BackButton = ({ linkTo }: { linkTo: string }) => (
  <Button linkTo={linkTo} className="secondary">
    <ArrowBackIosIcon />Back
  </Button>
)
