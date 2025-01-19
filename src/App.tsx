import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">テスト</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>テスト</DialogTitle>
          </DialogHeader>
          <Input />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
