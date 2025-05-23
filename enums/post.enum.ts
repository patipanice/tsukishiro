enum PostStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

enum PostPublishStatus {
  PUBLISH = "PUBLISH",
  UNPUBLISHED = "UN_PUBLISHED",
}

enum PostType {
  ADVICE = "ADVICE",
  TOPIC = "TOPIC",
  QA = "QA",
  REQUEST_MUSIC = "REQUEST_MUSIC",
}

enum OrderBy {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export { PostStatus, PostPublishStatus, PostType,OrderBy };
