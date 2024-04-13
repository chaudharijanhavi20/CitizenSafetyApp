export async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/elftsdmr/malware-url-detect",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
     console.error(error) 
    }
  }

export async function Smsclassifier(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mariagrandury/roberta-base-finetuned-sms-spam-detection",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error)
    }
  }