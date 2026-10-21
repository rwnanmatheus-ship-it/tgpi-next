// Run only with a securely provisioned OPENAI_API_KEY; never prints credentials or provider error bodies.
import OpenAI from 'openai';
if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required in the server environment.');
const client = new OpenAI({ maxRetries: 0, timeout: 45000 });
const model = process.env.TGPI_ATLAS_MODEL || 'gpt-6-astra';
try {
  const available = await client.models.retrieve(model);
  console.log(JSON.stringify({ availableModel: available.id }));
  const response = await client.responses.create({ model, input: 'Reply with exactly ATLAS_OK.', reasoning: { effort: 'low' }, max_output_tokens: 128, store: false });
  if (response.status !== 'completed' || response.output_text.trim() !== 'ATLAS_OK') throw new Error('Smoke response did not pass.');
  console.log(JSON.stringify({ passed: true, model: response.model, usage: response.usage }));
} catch (error) {
  console.error(JSON.stringify({ passed: false, status: error instanceof OpenAI.APIError ? error.status : undefined, code: error instanceof OpenAI.APIError ? error.code : 'validation_failed' }));
  process.exitCode = 1;
}
