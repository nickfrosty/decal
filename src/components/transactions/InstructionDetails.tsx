import { memo } from "react";
import { fromByteArray as fromByteArrayToBase64 } from "react-native-quick-base64";
import { MessageCompiledInstruction } from "@solana/web3.js";
import { List, ListItem } from "@/components/core/lists";
import { shortText } from "@/lib/utils";
import { StyleProp, ViewStyle } from "react-native";

type InstructionDetailsProps = {
  index: number;
  ix: MessageCompiledInstruction;
  programId: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export const InstructionDetails = memo(
  ({
    // comment for better diffs
    index,
    ix,
    programId,
    style,
  }: InstructionDetailsProps) => {
    return (
      <List key={index} className="mb-3" style={style}>
        <ListItem isTopItem={true} title={`#${index} - Unknown program ID`} />
        <ListItem title="Program ID" value={shortText(programId || "[err]")} />
        <ListItem title="Data" value={fromByteArrayToBase64(ix.data)} />

        {/* todo: add the list of accounts included in the ix here */}
        {/* <ListItem title="Accounts" value={""} /> */}
      </List>
    );
  },
);
