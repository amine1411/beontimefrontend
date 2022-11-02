import {
  Box,
  Heading,
  Button,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
//import { useState } from "react";

function Mission(props) {
  // Inverse Data Flow - handleModifyMission
  const handleModifyMission = () => {
    props.handleModifyMission(props);
  };

  // Inverse Data Flow - handleModifyMission
  const handleDeleteMission = () => {
    props.handleDeleteMission(props.idMission);
  };

  return (
    <Box p={5} height="auto" shadow="md" background="gray.50" rounded={6}>
      <Heading fontSize="l" color="black">
        {props.echeance} - {props.libelle}
      </Heading>
      <Text color="black">
        {props.type} - {props.idCollab}
      </Text>
      <HStack justifyContent="end">
        <IconButton
          size="lg"
          colorScheme="teal"
          variant="ghost"
          icon={<EditIcon />}
          onClick={() => handleModifyMission()}
        />
        <IconButton
          size="lg"
          colorScheme="teal"
          variant="ghost"
          icon={<DeleteIcon />}
          onDoubleClick={() => handleDeleteMission()}
        />

        {/* <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          onClick={() => handleModifyMission()}
        >
          Modifier
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          onClick={() => handleDeleteMission()}
        >
          Supprimer
        </Button>   */}
      </HStack>
    </Box>
  );
}

export default Mission;
