import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";



export const client = createClient({
    projectId: 'evgz3pup',
    dataset: 'production',
    apiVersion: '2023-11-15',
    useCdn: true, 
    token: import.meta.env.VITE_APP_TOKEN,
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);