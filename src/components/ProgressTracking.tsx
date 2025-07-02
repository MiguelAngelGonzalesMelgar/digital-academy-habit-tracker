import { Box, Text, Checkbox, Progress, Flex, Icon} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface ProgressTrackingProps {
  progress: boolean[];
  onProgressChange: (progress: boolean[]) => void;
  habitId: string;
}

const ProgressTracking = ({progress, onProgressChange, habitId}: ProgressTrackingProps) => {

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  // TODO: transform days into obj

  // Initial progress by default
  const defaultProgress = new Array(daysOfWeek.length).fill(false);

  // State
  const [completedDays, setCompletedDays] = useState<boolean[]>(progress ||defaultProgress);

  // Progress control
  const totalDays = daysOfWeek.length;
  const completedCount = completedDays.filter(day => day).length;
  const progressValue = (completedCount / totalDays) * 100 // Percentage
  const sevenDaysStreak = completedCount === totalDays;

  // Efect to handle progress
  useEffect(() => {
      setCompletedDays(progress || defaultProgress);
  }, [progress, defaultProgress])

  // handler
  const handleOnChangeCheckbox = (index: number) => {
    const progressUpdate = [...completedDays];
    progressUpdate[index] = !progressUpdate[index]; // If true now false
    setCompletedDays(progressUpdate);
    onProgressChange(progressUpdate) // Lift state up
  }

  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg" 
      position="relative"
      boxShadow="dark-lg"
      bg="linear-gradient(90deg,rgb(255, 255, 255) 0%, rgb(214, 214, 214) 100%, rgb(251, 242, 242) 100%);"
      >
      <Text 
        fontSize="lg" mb={3} 
        fontWeight="medium">
        Weekly Progress
      </Text>
      <Flex 
        wrap="wrap" 
        justify="space-evenly">
        
        {daysOfWeek.map((day, index) => (
          <Checkbox
            key={index}
            isChecked={completedDays[index]}
            onChange={() => handleOnChangeCheckbox(index)}
            colorScheme="green"
            size={{base:"sm", md: "md"}}
            mb="3"
            id={`progress-${habitId}-${index}`}
            name={`progress-${habitId}-day-${index}`}
          >{day}
          </Checkbox>
        ))}
      </Flex>

      <Box 
        mt={4}
      >
      <Progress 
        value={progressValue} 
        size="md" colorScheme="green" 
        borderRadius="md" 
        bg="lightgray"
      />
      </Box>

      {sevenDaysStreak && (
        <Flex
          position="absolute"
          bottom="8px"
          right="8px"
          align="center"
          justify="center"
          boxSize="40px"
          bg="yellow.400"
          borderRadius="full"
          boxShadow="md"
        >
          <Icon 
            as={FaStar} 
            w={6} h={6} 
            color="orange" 
          />
        </Flex>
      )}
    </Box>
  );

}

export default ProgressTracking;
