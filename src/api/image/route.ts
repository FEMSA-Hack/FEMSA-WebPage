import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface ID {
  customer_id: string;
}

export const dynamic = 'force-dynamic';

// Updated function to handle image upload with a POST request
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API;
    
    if (!backendUrl) {
      throw new Error("API base URL is not configured");
    }

    // Get the form data from the request
    const formData = await request.formData();
    
    // Get the image file from form data
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }
    console.log("Image file received:", imageFile);
    // Create a new FormData to send to the backend
    const backendFormData = new FormData();
    backendFormData.append('image', imageFile);

    // Send the image to the backend
    const response = await fetch(
      `${backendUrl}/api/uno`,
      {
        method: "POST",
        body: backendFormData,
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Endpoint not found" },
          { status: 404 }
        );
      }
      throw new Error(`Failed to process image: ${response.statusText}`);
    }

    // Return the processed result
    const result = await response.json();
    return NextResponse.json(result);
      
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process image" },
      { status: 500 }
    );
  }
}
