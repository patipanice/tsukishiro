"use server";

export async function createInvoice(prevState: any, formData: FormData) {

  setTimeout(() => {
    // throw new Error("Error creating invoice");
    
  }, 3000);

  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  if (!rawFormData.customerId || !rawFormData.amount || !rawFormData.status) {
    return {
      message: "Missing required fields",
    };
  }

  return {
    message: "Invoice created successfully",
  };
}
