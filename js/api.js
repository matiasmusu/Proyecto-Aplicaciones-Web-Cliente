import { AIRTABLE_TOKEN } from "./keys.js";

const BASE_ID = "appgIAsehtlfBGRSP";
const TABLE_NAME = "Productos";
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

function getHeaders() {
    return {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json"
    };
}

export async function getProducts() {
    const response = await fetch(AIRTABLE_URL, {
        headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`
        }
    });
    const data = await response.json();

    return data.records.map(r => ({
        id: r.id,
        ...r.fields
    }));
}

export async function getProductById(id) {
    const response = await fetch(`${AIRTABLE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`
        }
    });
    const data = await response.json();

    return { id: data.id, ...data.fields };
}

export async function createProduct(fields) {
    const body = JSON.stringify({ fields });

    const response = await fetch(AIRTABLE_URL, {
        method: "POST",
        headers: getHeaders(),
        body
    });

    const data = await response.json();
    return { id: data.id, ...data.fields };
}

export async function updateProduct(id, fields) {
    const body = JSON.stringify({ fields });

    const response = await fetch(`${AIRTABLE_URL}/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body
    });

    const data = await response.json();
    return { id: data.id, ...data.fields };
}

export async function deleteProduct(id) {
    await fetch(`${AIRTABLE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`
        }
    });
}
