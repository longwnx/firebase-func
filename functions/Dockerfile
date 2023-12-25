FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18 as runtime
WORKDIR ${LAMBDA_TASK_ROOT}
COPY .env ./
COPY --from=builder /app/dist ./
CMD ["index.handler"]
