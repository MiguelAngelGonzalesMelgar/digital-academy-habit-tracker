import {
	Card,
	CardHeader,
	CardBody,
	Text,
	HStack,
	Box,
	IconButton,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from "@chakra-ui/react";
import ProgressTracking from "./ProgressTracking";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditHabitModal from "./EditHabitModal";
import { useRef } from "react";

interface HabitCardProps {
	habitName: string;
	color: string;
	habitId: string;
	progress: boolean[];
	onProgressChange: (progress: boolean[]) => void;
	onEdit: (id: string, newName: string, newColor: string) => void;
	onDelete: (id: string) => void;
}

const HabitCard = ({
	habitName,
	color,
	habitId,
	onProgressChange,
	onEdit,
	onDelete,
	progress,
}: HabitCardProps) => {
	// Chakra modal handlers
	const editDisclosure = useDisclosure();

	const deleteDisclosure = useDisclosure();
	const cancelRef = useRef(null);

	// Handler for edit and delete
	const handleEditSave = (newName: string, newColor: string) => {
		onEdit(habitId, newName, newColor);
		editDisclosure.onClose();
	};

	const handleDeleteHabit = (habitId: string) => {
		onDelete(habitId);
		deleteDisclosure.onClose();
	};

	return (
		<Box
			position="relative"
			_hover={{ ".actions": { opacity: 1 } }}
		>
			<Card
				bg="white"
				marginBottom={2}
				boxShadow="dark-lg"
				textColor="#444444"
			>
				<CardHeader
					padding="32px"
					bg={color}
				>
					<Text
						fontSize={{ base: "16px", md: "21px" }}
						fontWeight={"bold"}
						textAlign="start"
						textShadow="1px 1px rgb(83, 82, 82)"
						marginBottom={3}
						textColor="#ac7070"
					>
						{habitName}
					</Text>
				</CardHeader>

				<CardBody>
					<ProgressTracking
						onProgressChange={onProgressChange}
						habitId={habitId}
						progress={progress}
					/>
				</CardBody>
			</Card>

			{/*Edit-Delete Modal Buttons*/}
			<HStack
				className="actions"
				position="absolute"
				top={2}
				right={2}
				opacity={{ base: 1, md: 0 }}
				transition="opacity 0.2s"
				spacing={2}
			>
				<IconButton
					aria-label="Edit"
					icon={<FaEdit />}
					colorScheme="yellow"
					size={{ base: "xs", md: "sm" }}
					onClick={editDisclosure.onOpen}
				/>
				<IconButton
					aria-label="Delete"
					icon={<FaTrash />}
					colorScheme="red"
					size={{ base: "xs", md: "sm" }}
					onClick={deleteDisclosure.onOpen}
				/>
			</HStack>

			{/* Edit Modal */}
			<EditHabitModal
				isOpen={editDisclosure.isOpen}
				onClose={editDisclosure.onClose}
				initialName={habitName}
				initialColor={color}
				onSave={handleEditSave}
			/>

			{/* Delete dialog */}
			<AlertDialog
				isOpen={deleteDisclosure.isOpen}
				leastDestructiveRef={cancelRef}
				onClose={deleteDisclosure.onClose}
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader bg="cadetblue">Delete Habit</AlertDialogHeader>
					<AlertDialogBody fontWeight="medium">
						Are your sure? This action cannot be undone.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button
							colorScheme="blue"
							marginRight={2}
							ref={cancelRef}
							onClick={deleteDisclosure.onClose}
						>
							Cancel
						</Button>
						<Button
							colorScheme="pink"
							onClick={() => handleDeleteHabit(habitId)}
						>
							Confirm Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Box>
	);
};

export default HabitCard;
