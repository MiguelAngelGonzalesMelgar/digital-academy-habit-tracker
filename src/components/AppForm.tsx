import {
	FormControl,
	FormLabel,
	HStack,
	useToast,
	VStack,
} from "@chakra-ui/react";
import AppInput from "./AppInput";
import ColorPicker from "./ColorPicker";
import AppButton from "./AppButton";
import { useState } from "react";

// Colors
export const AVAILABLE_COLORS = [
	"#FF746C50",
	"#8FBC8B80",
	"#F68BA250",
	"#E2CF8850",
	"#D8B0C850",
];

// Habits structure
export interface Habit {
	id: string;
	name: string;
	color: string;
}

// Form Props
interface AppFormProps {
	onAddHabit: (newHabit: Habit) => void;
}

const AppForm = ({ onAddHabit }: AppFormProps) => {
	// States
	const [habitName, setHabitName] = useState<string>("");
	const [PickedColor, setPickedColor] = useState<string>("#F5F4D650");

	// Toast
	const toast = useToast();

	// Handler
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		// Check if input is empty
		if (habitName.trim() === "") {
			toast({
				title: "Ups! Can't add empty habit.",
				description: "Please enter a new habit.",
				status: "info",
				duration: 4000,
				isClosable: true,
				position: "top-right",
			});
			return;
		}

		// Define a new habit
		const newHabit: Habit = {
			id: crypto.randomUUID(),
			name: habitName.trim(),
			color: PickedColor,
		};

		// Handle the newHabit creation
		onAddHabit(newHabit);
		setHabitName("");
		// Handle color selection
		setPickedColor("#F5F4D6");
	};

	// Component
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHabitName(event.target.value);
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<VStack
					spacing={4}
					align="stretch"
				>
					<FormControl>
						<FormLabel
							htmlFor="habit-name"
							textColor="#9E905F"
							textShadow="1px 1px rgb(83, 82, 82)"
						>
							Add a new habit:
						</FormLabel>
						<AppInput
							placeholder="e.g. Drink more water"
							value={habitName}
							type="text"
							onChange={handleOnChange}
							id="habit-name"
						/>
					</FormControl>

					<FormControl>
						<HStack
							spacing={4}
							justify="space-around"
							flexWrap="wrap"
						>
							<ColorPicker
								colors={AVAILABLE_COLORS}
								selectedColor={PickedColor}
								onColorSelect={setPickedColor}
								id="habit-color"
							/>
							<AppButton
								type="submit"
								onClick={() => {}}
							>
								Add habit
							</AppButton>
						</HStack>
					</FormControl>
				</VStack>
			</form>
		</section>
	);
};

export default AppForm;
