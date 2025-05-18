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

    // Create a new FormData to send to the backend
    const backendFormData = new FormData();
    backendFormData.append('image', imageFile);

    // Send the image to the backend
    const response = await fetch(
      `${backendUrl}/api/`,
      {
        method: "POST",
        body: backendFormData,
        // No need to set Content-Type for FormData, it sets multipart/form-data automatically
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

// Keep the GET method if it's still needed
export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API;
    
    if (!backendUrl) {
      throw new Error("API base URL is not configured");
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const params = searchParams.toString();

    const response = await fetch(
      `${backendUrl}/api/${params ? '?' + params : ''}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const customer_id = await response.json() as ID;
    return NextResponse.json({ id: customer_id });
      
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch credits" },
      { status: 500 }
    );
  }
}
