from django.core.management.base import BaseCommand
from resources.models import QuickQuestion

class Command(BaseCommand):
    help = 'Initialize the database with sample quick questions for the chatbot'

    def handle(self, *args, **options):
        # Check if quick questions already exist
        if QuickQuestion.objects.exists():
            self.stdout.write(
                self.style.WARNING('Quick questions already exist in the database. Skipping initialization.')
            )
            return

        # Define sample quick questions
        quick_questions = [
            # Emergency Procedures
            {
                'category': 'emergency',
                'question_text': 'What should I do if I see a fire?',
                'response_text': 'If you see a fire, immediately evacuate the area and call emergency services (911 or your local emergency number). Never try to retrieve personal belongings. Once you are safe, alert others and stay at a safe distance until help arrives.',
                'order': 1,
                'is_active': True
            },
            {
                'category': 'emergency',
                'question_text': 'How do I report a fire emergency?',
                'response_text': 'Call 911 (or your local emergency number) immediately. Provide your exact location, the nature of the emergency, and any relevant details about the fire. Do not hang up until the operator tells you to do so.',
                'order': 2,
                'is_active': True
            },
            {
                'category': 'emergency',
                'question_text': 'What is the emergency number?',
                'response_text': 'In case of fire emergency, dial 911 (or your local emergency number). For non-emergency inquiries, you can visit your nearest BFP station or call their office during business hours.',
                'order': 3,
                'is_active': True
            },

            # Fire Prevention
            {
                'category': 'prevention',
                'question_text': 'How can I prevent home fires?',
                'response_text': 'To prevent home fires: Never leave cooking unattended, keep flammable items away from heat sources, have electrical wiring checked regularly, properly store flammable liquids, and install and maintain smoke alarms.',
                'order': 1,
                'is_active': True
            },
            {
                'category': 'prevention',
                'question_text': 'What are common fire hazards?',
                'response_text': 'Common fire hazards include: unattended candles, overloaded electrical outlets, faulty wiring, uncleaned dryer vents, improperly stored flammable materials, and children playing with matches or lighters.',
                'order': 2,
                'is_active': True
            },
            {
                'category': 'prevention',
                'question_text': 'How often should I inspect my home?',
                'response_text': 'Conduct a home fire safety inspection monthly. Check smoke alarms, test fire extinguishers, inspect electrical cords, and ensure heating equipment is clean and properly ventilated.',
                'order': 3,
                'is_active': True
            },

            # Safety Equipment
            {
                'category': 'equipment',
                'question_text': 'How do I use a fire extinguisher?',
                'response_text': 'To use a fire extinguisher, remember the acronym PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, and Sweep from side to side. Only attempt to use an extinguisher on small fires and always have an escape route.',
                'order': 1,
                'is_active': True
            },
            {
                'category': 'equipment',
                'question_text': 'How do I test my smoke alarm?',
                'response_text': 'Press and hold the test button on your smoke alarm until it sounds. If it doesn\'t sound, replace the batteries immediately. Test your smoke alarms monthly and replace batteries annually.',
                'order': 2,
                'is_active': True
            },
            {
                'category': 'equipment',
                'question_text': 'What types of fire extinguishers are there?',
                'response_text': 'Common fire extinguisher types: Class A (ordinary combustibles like wood/paper), Class B (flammable liquids like gasoline), Class C (electrical fires), Class D (combustible metals), and Class K (cooking oils/greases).',
                'order': 3,
                'is_active': True
            },

            # For Kids
            {
                'category': 'kids',
                'question_text': 'What is Stop, Drop, and Roll?',
                'response_text': 'Stop, Drop, and Roll is a fire safety technique: Stop moving immediately, Drop to the ground and cover your face with your hands, then Roll over and over until the fire is out. Practice this with children so they know what to do.',
                'order': 1,
                'is_active': True
            },
            {
                'category': 'kids',
                'question_text': 'What should I do during a fire drill?',
                'response_text': 'During a fire drill: Stay calm, walk quickly (don\'t run), follow your escape route, stay low if there\'s smoke, and go to your designated meeting place outside. Never hide during a real fire.',
                'order': 2,
                'is_active': True
            },
            {
                'category': 'kids',
                'question_text': 'How do I escape from a room with smoke?',
                'response_text': 'If you\'re in a smoky room: Stay low to avoid smoke inhalation, feel doors for heat before opening them, crawl to the nearest exit, and if the door is hot, find another way out or seal gaps with clothing and call for help.',
                'order': 3,
                'is_active': True
            },

            # Website Navigation
            {
                'category': 'navigation',
                'question_text': 'Take me to the Kids Zone',
                'response_text': 'You can access the Kids Zone by clicking the "Kids" button in the main navigation menu. There you\'ll find fun fire safety games and educational activities for children.',
                'order': 1,
                'is_active': True
            },
            {
                'category': 'navigation',
                'question_text': 'Show me Fire Safety Resources',
                'response_text': 'Visit the "Professionals" or "Adults" sections in the main navigation menu to access comprehensive fire safety resources, guides, and training materials.',
                'order': 2,
                'is_active': True
            },
            {
                'category': 'navigation',
                'question_text': 'Where can I find printable materials?',
                'response_text': 'Printable fire safety materials are available in the Resources section. Look for the download icons next to each resource or visit the dedicated printables page.',
                'order': 3,
                'is_active': True
            },
            {
                'category': 'navigation',
                'question_text': 'How do I contact BFP?',
                'response_text': 'For emergency situations, dial 911. For non-emergency inquiries, visit your nearest BFP station or call their office during business hours. Contact information is available in the footer of this website.',
                'order': 4,
                'is_active': True
            },

            # General Information
            {
                'category': 'general',
                'question_text': 'What are fire safety inspections?',
                'response_text': 'Fire safety inspections ensure buildings comply with fire codes. Businesses and multi-family dwellings are required to have regular inspections. Contact your local BFP station to schedule an inspection.',
                'order': 1,
                'is_active': True
            },
            {
                'category': 'general',
                'question_text': 'How do I create a fire escape plan?',
                'response_text': 'Create a home fire escape plan: Draw a map of your home, mark two ways out of each room, establish a meeting place outside, practice the drill twice a year, and ensure everyone knows how to call emergency services.',
                'order': 2,
                'is_active': True
            },
        ]

        # Create quick questions in the database
        for question_data in quick_questions:
            QuickQuestion.objects.create(**question_data)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully added {len(quick_questions)} quick questions to the database.')
        )
