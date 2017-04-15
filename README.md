# Visual Protocol Buffer

A visual generator of [Protocol Buffer](https://github.com/google/protobuf), Google's data interchange format.

Configure your application-layer protocol in webpage and download it.

Related to [Visual Protocol Buffer Server](https://github.com/funcxy/visual-protobuf-server).

## Example

Input the following proto directly and click generate button

```proto
syntax = "proto3";

message Test {
  string name = 1;
  int32 id = 2;
  string email = 3;
}
```

you will get a zip of generated source.