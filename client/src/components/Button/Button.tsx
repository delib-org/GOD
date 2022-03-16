import React, { FC } from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader"
import classNames from 'classnames'
import { useAppSelector } from "../../redux/hooks";
import './Button.scss'

type ButtonProps = {
  className?: string;
  apiKey?: string;
  disabled?: boolean;
  onClick?: Function;
  linkTo?: string;
  children: React.ReactNode | React.ReactNodeArray;
}

const Button: FC<ButtonProps> = ({ apiKey, className, disabled, onClick, linkTo, children, ...props }) => {
  // @ts-ignore
  const isPending = useAppSelector((state: any) => get(state.api, [apiKey, 'status'], '') === 'pending')

  const renderButton = () => (
    <div className={classNames("button", className, { pending: isPending, disabled })} onClick={(e) => onClick && !disabled && !isPending && onClick(e)} {...props}>
      {isPending && (
        <div className="loading">
          <BeatLoader color="#0c123a" loading size={10} margin={1} />
        </div>
      )}
      {children}
    </div>
  )

  return linkTo ? (<Link className={className} to={linkTo}>{renderButton()}</Link>) : renderButton()
}

export default Button
