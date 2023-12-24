FROM scratch
ADD x86_64/22f00718d013305cd61f4906577540cc6804d6603602567f1bff83781ebe6893.tar.xz /
ADD x86_64/88f2931da348e4df07deb80db8d3d1f42f27bac499f4d786543b5d3520b360c8.tar.xz /
ADD x86_64/8ac98ca8d59bf7ca6c4889d72b65a954cf14af58b8e5672c42469dc0c36cd8a4.tar.xz /
ADD x86_64/9a75445380a50339a32e7a9710a586be0a0203193182c5c4a65789c540e99318.tar.xz /
ADD x86_64/e8312a6d39ae266ae459772d2cea9fac729fe7ed9f58f28bc0cccf6d7b227c4c.tar.xz /
ADD x86_64/feb815887f22ce6ea2814b716320e5a1b255f00f3ed05a1f21f0d8640b117208.tar.xz /

ENV LANG=en_US.UTF-8
ENV TZ=:/etc/localtime
ENV PATH=/var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin
ENV LD_LIBRARY_PATH=/var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib
ENV LAMBDA_TASK_ROOT=/src
ENV LAMBDA_RUNTIME_DIR=/var/runtime

WORKDIR /var/task

ENTRYPOINT ["/lambda-entrypoint.sh"]



FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /Users/longnguyenxuan/Apps/Persional/firebase-func/functions
COPY package.json src/index.ts src/server.ts src ./
RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /Users/longnguyenxuan/Apps/Persional/firebase-func/functions/ ./
CMD ["index.handler"]
