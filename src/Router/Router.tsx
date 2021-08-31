import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hookies/useAuth';


type RouteWrapperProps = {
    component: any,
    path: string,
    exact?: boolean,
    isPrivate?: boolean,
}

export default function RouteWrapper({ component: Component, isPrivate, ...rest }: RouteWrapperProps) {
    const { isSigned, loading } = useAuth();

    if(loading){
        return (
            <div></div>
        )
    }

    if(!isSigned && isPrivate ){
        return <Redirect to="/" />
    }

    if(isSigned && !isPrivate){
        return <Redirect to="/courses" />
    }

    return (
        <Route {...rest} render={ props => (
            <Component {...props} />
            )}
        />
    )
}