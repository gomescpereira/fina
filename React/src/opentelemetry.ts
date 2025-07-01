import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
//import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
//import { registerInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ConsoleSpanExporter, SimpleSpanProcessor, TracerConfig, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
 



const providerConfig: TracerConfig = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-app', }),
};

// Crie o provedor de rastreamento
//const provider = new WebTracerProvider();
const provider = new WebTracerProvider(providerConfig);

// Adicione um processador de spans simples com um exportador de console
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Registre as instrumentações automáticas
registerInstrumentations({
  tracerProvider: provider,
});

// Ative o provedor
provider.register();

