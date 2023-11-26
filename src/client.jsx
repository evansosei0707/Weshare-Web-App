import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";



export const client = createClient({
    projectId: 'evgz3pup',
    dataset: 'production',
    apiVersion: '2023-11-15',
    useCdn: true, 
    token: "sktomCAR6SuSRtPjxBNcJJYjxz3SBu9hqADfHcMEGd20NrcZ6fpDeUmRwevySVPfwvmqMhQxUvFaD4vn6M5Hoa24DHJnULHoZVONaDIHdHN1ix0mMgCiG85e3K12v6El1u4qlE4mv3mFWFYqpE731jUKm4p9klowXW0O6VKZCFcL2AOtdTyD"
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);