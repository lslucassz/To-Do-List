import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase = {
    id: number
    name: string
    description: string
}

export function useProductDatabase() {
    const database = useSQLiteContext()

    async function create(data: Omit<ProductDatabase, "id">) {
        const statement = await database.prepareAsync(
            `INSERT INTO products (name, description) VALUES ($name, $description)`
        )
        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $description: data.description,
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM products WHERE name LIKE ?"

            const response = await database.getAllAsync<ProductDatabase>(query, `%${name}%`)

            return response
        } catch (error) {
            throw error
        }
    }

    async function searchById(id: string) {
        try {
            const query = "SELECT * FROM products WHERE id LIKE ?"

            const response = await database.getAllAsync<ProductDatabase>(query, `%${id}%`)

            return response
        } catch (error) {
            throw error
        }
    }

    async function remove(id: number) {
        try {
            await database.execAsync("DELETE FROM products WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    return { create, searchByName, searchById, remove }
}