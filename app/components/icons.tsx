import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';



import { ComponentProps } from 'react';

type FontAwesome6Props = ComponentProps<typeof FontAwesome6>;
export function IngresosIcon(props: FontAwesome6Props){
    return (
        <MaterialCommunityIcons name="cash-check" {...props} />
    )
}

export function EgresosIcon(props: FontAwesome6Props){
    return (
        <MaterialCommunityIcons name="cash-remove" {...props}/>
    )
}

export function PerfilIcon(props: FontAwesome6Props){
    return (
        //<AntDesign name="user" {...props} />
        <FontAwesome6 name="user-gear" {...props} />
    )
}