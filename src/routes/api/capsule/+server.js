import { supabase } from '$lib/supabase'

export async function POST({ request }) {

const data = await request.json()

const {
email,
title,
letter,
goals,
prayer,
delivery_date,
vision_image
} = data

const { error } = await supabase
.from('capsules')
.insert([
{
email,
title,
letter,
goals,
prayer,
delivery_date,
vision_image
}
])

if(error){
return new Response(JSON.stringify(error),{status:500})
}

return new Response(JSON.stringify({success:true}),{status:200})

}