import { Slot } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'

import { databaseInit } from '../database/databaseInit'

export default function Layout() {
    return (
        <SQLiteProvider databaseName='myapp.db' onInit={databaseInit}>

            <Slot />
            
        </SQLiteProvider>        
    )
}