import { useLocation } from "react-router-dom";

const useWizardRoute = () => {
  const { pathname } = useLocation()
  const urlSplit = pathname.split('/');
  return parseInt(urlSplit[urlSplit.length - 1], 10);
}

export default useWizardRoute
