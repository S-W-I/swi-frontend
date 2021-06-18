import { FileSystemSnake, FileSystemEntity } from "parser/file";





describe("parser tests", () => {


  it("file parser test", () => {
    
    const filesystem = new FileSystemSnake([
      FileSystemEntity.new_file({ name: "file.so" }),
      FileSystemEntity.dir_with_entities({ name: "some_stuff" }, [
        FileSystemEntity.new_file({ name: "sh.so" }),
        FileSystemEntity.dir_with_entities({ name: "some_stuff2" }, [
          FileSystemEntity.new_file({ name: "sh2.so" }),
        ]),
      ]).populateDepth(),
    ]);




  })
})