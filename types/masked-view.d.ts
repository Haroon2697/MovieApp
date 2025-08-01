declare module "@react-native-masked-view/masked-view" {
  import { ReactNode } from "react";
  
  interface MaskedViewProps {
    maskElement: ReactNode;
    children: ReactNode;
  }
  
  const MaskedView: React.ComponentType<MaskedViewProps>;
  export default MaskedView;
} 